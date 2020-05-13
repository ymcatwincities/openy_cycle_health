<template>
  <div>
    <Greeting
      :login-required="true"
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
    ></ExerciseModal>

    <ExerciseList
      :exercise-list="exercisesOptions"
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
    components: {
      Greeting,
      ExerciseModal,
      ExerciseList,
      Spinner,
    },
    props: ['game_nid', 'progress_nid', 'exercise_list', 'finished_exercises', 'completion_url'],
    data() {
      twelve.local_storage.save_today_progress(this.$props.progress_nid, this.$props.finished_exercises);
      return {
        currentExercise: {},
        exerciseModalVisible: false,
        nameModalVisible: false,
        isStepNextDisabled: true
      };
    },
    created: function () {
      twelve.local_storage.set_progress_nid(drupalSettings.user.uid, this.$props.game_nid, this.$props.progress_nid);
      if (this.$props.finished_exercises.length === 0) {
        let cache = twelve.local_storage.load_today_progress(this.$props.progress_nid);
        for (let index = 0; index < cache.length; index++) {
          this.$props.finished_exercises.push(cache[index]);
        }
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

        if (this.fullyCompletedTodayExercises()) {
          window.location = window.location.origin + '/user';
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
    },
    computed: {
      exercisesOptions: function () {
        var options = {};
        var index = 1;
        for (var i in this.exercise_list) {
          var item = this.exercise_list[i];

          options[i] = {
            'label': item.label,
            'description': item.description,
            'timer': item.timer,
            'gif_path': item.gif,
            'id': item.id,
            'puzzle_image_url': item.puzzle_image_url,
            'index_number': index++
          };
        }

        return options;
      }
    }
  }
</script>
