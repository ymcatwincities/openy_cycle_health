<template>
  <div>
    <Greeting
      :login-required="true"
      :name-modal-visible="nameModalVisible"
      v-on:show-greeting-modal="nameModalVisible = true"
      v-on:hide-greeting-modal="nameModalVisible = false"
    ></Greeting>

    <BadgeModal
      :badge-modal-visible="badgeModalVisible"
      v-on:hide-badge-modal="badgeModalVisible = false"
    ></BadgeModal>

    <ExerciseModal
      :exercise="current_exercise"
      :exercise-modal-visible="exerciseModalVisible"
      :is-exercise-finished="isExerciseFinished"
      :on-exercise-finished="onExerciseFinished"
      :on-exercise-closed="onExerciseClosed"
      :debug="debug"
    ></ExerciseModal>

    <ExerciseList
      :exercise-list="exercisesOptions"
      :is-exercise-finished="isExerciseFinished"
      :on-exercise-selected="onExerciseSelected"
      :disabled="nameModalVisible || exerciseModalVisible || badgeModalVisible"
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
  import BadgeModal from "../components/BadgeModal.vue";

  export default {
    components: {
      BadgeModal,
      Greeting,
      ExerciseModal,
      ExerciseList,
      Spinner,
    },
    props: ['debug', 'game_nid', 'progress_nid', 'exercise_list', 'finished_exercises'],
    data() {
      twelve.local_storage.save_today_progress(this.$props.progress_nid, this.$props.finished_exercises);
      let bingo = twelve.bingo.search(this.exercise_list, this.$props.finished_exercises, []);
      console.log(bingo);
      return {
        current_exercise: {},
        exerciseModalVisible: false,
        nameModalVisible: false,
        badgeModalVisible: false,
        isStepNextDisabled: true,
        bingoBools: bingo.bingo_bools
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

        this.current_exercise = exercise;
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

        this.checkForBingo();
      },
      beep: function () {
        let snd = new Audio('/modules/custom/twelve_app/assets/disco_alarm.wav');
        snd.play();
      },
      fullyCompletedTodayExercises: function () {
        return (this.$props.finished_exercises.length >= Object.keys(this.$props.exercise_list).length);
      },
      checkForBingo: function() {
        let bingo = twelve.bingo.search(this.exercise_list, this.$props.finished_exercises, this.bingoBools);
        console.log(bingo);
        this.bingoBools = bingo.bingo_bools;
        if (bingo.full_bingo) {
          this.badgeModalVisible = true;
        }
        if (bingo.found_new_bingo) {
          this.badgeModalVisible = true;
        }
      },
    },
    computed: {
      exercisesOptions: function () {
        var options = [];
        var index = 0;
        for (var i in this.exercise_list) {
          var item = this.exercise_list[i];

          options[i] = {
            'label': item.label,
            'description': item.description,
            'timer': item.timer,
            'gif_path': item.gif,
            'id': item.id,
            'index_number': index++
          };
        }

        return options;
      }
    }
  }
</script>
