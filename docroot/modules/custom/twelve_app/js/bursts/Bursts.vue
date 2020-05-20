<template>
  <div>
    <Greeting
      :login-required="false"
      :name-modal-visible="nameModalVisible"
      v-on:show-greeting-modal="nameModalVisible = true"
      v-on:hide-greeting-modal="nameModalVisible = false"
    ></Greeting>

    <ExerciseModal
      :exercise="currentExercise"
      :exercise-modal-visible="exerciseModalVisible"
      :is-exercise-finished="isExerciseFinished"
      :on-exercise-finished="onExerciseFinished"
      :on-exercise-closed="onExerciseClosed"
      :debug="debug"
    ></ExerciseModal>

    <ExerciseList
      :exercise-list="exercise_list"
      :is-exercise-finished="isExerciseFinished"
      :on-exercise-selected="onExerciseSelected"
      :disabled="nameModalVisible || exerciseModalVisible"
    ></ExerciseList>

    <notifications group="twelve_app"></notifications>
  </div>
</template>

<script>
  import Greeting from '../components/Greeting.vue';
  import ExerciseModal from '../components/ExerciseModal.vue';
  import ExerciseList from './components/ExerciseList.vue';
  import Spinner from '../components/Spinner.vue'
  import twelve from '../helper/twelve';

  export default {
    components: {Greeting, ExerciseModal, ExerciseList, Spinner },
    props: ['debug', 'error_message', 'game_nid', 'progress_nid', 'exercise_list', 'finished_exercises', 'completion_url'],
    data() {
      return {
        currentExercise: {},
        exerciseModalVisible: false,
        nameModalVisible: false,
        isStepNextDisabled: true
      };
    },
    created: function () {
      if (this.$props.finished_exercises.length === 0) {
        let cache = twelve.local_storage.load_today_progress(this.$props.progress_nid);
        for (let index = 0; index < cache.length; index++) {
          this.$props.finished_exercises.push(cache[index]);
        }
      } else {
        twelve.local_storage.save_today_progress(this.$props.progress_nid, this.$props.finished_exercises);
      }
    },
    methods: {
      onExerciseSelected: function (exercise) {
        if (this.isExerciseFinished(exercise)) {
          return;
        }

        this.currentExercise = exercise;
        this.exerciseModalVisible = true;
      },
      onExerciseClosed: function () {
        this.exerciseModalVisible = false;

        if (this.fullyCompletedTodayExercises() && this.$props.completion_url.length > 0) {
          window.location = window.location.origin + this.$props.completion_url;
        }
      },
      isExerciseFinished: function(exercise) {
        return this.$props.finished_exercises.includes(exercise.id);
      },
      onExerciseFinished(exercise) {
        this.$props.finished_exercises.push(exercise.id);
        this.beep();

        twelve.local_storage.save_today_progress(this.$props.progress_nid, Array.from(this.$props.finished_exercises.values()));
        twelve.send_progress(
          drupalSettings.user.uid,
          this.$props.game_nid,
          this.$props.progress_nid,
          this.$props.finished_exercises,
        );

        this.$notify({
          group: 'twelve_app',
          title: 'Hooray, you have finished your exercise!',
          text: 'Now, lets have some rest.'
        });
      },
      beep: function () {
        let snd = new Audio('/modules/custom/twelve_app/assets/disco_alarm.wav');
        snd.play();
      },
      fullyCompletedTodayExercises: function () {
        return (this.$props.finished_exercises.length >= Object.keys(this.$props.exercise_list).length);
      },
    }
  }
</script>
