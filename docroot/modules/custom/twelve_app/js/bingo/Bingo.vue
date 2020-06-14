<template>
  <div>
    <DebugBar
      :debug="debug"
      :error_message="error_message"
      :debug-show-badge-modal="debugShowBadgeModal"
    ></DebugBar>

    <Greeting
      :login-required="true"
      :name-modal-visible="nameModalVisible"
      v-on:show-greeting-modal="nameModalVisible = true"
      v-on:hide-greeting-modal="nameModalVisible = false"
    ></Greeting>

    <BadgeModal
      :type="badgeType"
      :text="badgeText"
      :button-text="badgeButtonText"
      :goto-url="badgeUrl"
      :badge-modal-visible="badgeModalVisible"
      v-on:hide-badge-modal="badgeModalVisible = false"
    ></BadgeModal>

    <ExerciseModal
      :exercise="currentExercise"
      :exercise-modal-visible="exerciseModalVisible"
      :is-exercise-finished="isExerciseFinished"
      :on-exercise-finished="onExerciseFinished"
      :on-exercise-closed="onExerciseClosed"
      :btn-text="btnText"
      :debug="debug"
    ></ExerciseModal>

    <ExerciseList
      :exercise-list="exercise_list"
      :is-exercise-finished="isExerciseFinished"
      :on-exercise-selected="onExerciseSelected"
      :disabled="nameModalVisible || exerciseModalVisible || badgeModalVisible"
    ></ExerciseList>

    <notifications group="twelve_app"></notifications>
  </div>
</template>

<script>
  import DebugBar from "../components/DebugBar.vue";
  import Greeting from '../components/Greeting.vue';
  import ExerciseModal from '../components/ExerciseModal.vue';
  import ExerciseList from './components/ExerciseList.vue';
  import Spinner from '../components/Spinner.vue'
  import twelve from '../helper/twelve';
  import BadgeModal from "../components/BadgeModal.vue";
  import BadgeHelper from '../helper/twelve/user/badge';

  export default {
    components: {
      DebugBar,
      BadgeModal,
      Greeting,
      ExerciseModal,
      ExerciseList,
      Spinner,
    },
    props: ['debug', 'error_message', 'game_nid', 'progress_nid', 'exercise_list', 'finished_exercises'],
    data: function() {
      twelve.local_storage.save_today_progress(this.$props.progress_nid, this.$props.finished_exercises);
      let bingo = twelve.bingo.search(this.exercise_list, this.$props.finished_exercises, []);
      return {
        currentExercise: {},
        btnText: 'READY … SET … GO!',
        exerciseModalVisible: false,
        nameModalVisible: false,
        isStepNextDisabled: true,
        bingoBools: bingo.bingo_bools,
        badgeModalVisible: false,
        badgeType: '',
        badgeText: '',
        badgeButtonText: '',
        badgeUrl: ''
      };
    },
    created: function () {
      twelve.local_storage.set_user_name(twelve.user.get_active_player_name());

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

        if (this.fullyCompletedTodayExercises() && !this.badgeModalVisible) {
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
        this.bingoBools = bingo.bingo_bools;
        if (bingo.full_bingo) {
          this.badgeType = 'full-bingo';
          this.badgeText = 'You earned a Black Out Badge!';
          this.badgeUrl = '/challenges';
          this.badgeButtonText = 'FIND MORE BURSTS';
          this.badgeModalVisible = true;
          this.onExerciseClosed();
          BadgeHelper.create_full_bingo(this.$props.game_nid);
        } else if (bingo.found_new_bingo) {
          this.badgeType = 'bingo';
          this.badgeUrl = '';
          this.badgeText = 'You earned a Bingo Badge!';
          this.badgeButtonText = 'GO FOR A BLOCKOUT';
          this.badgeModalVisible = true;
          this.onExerciseClosed();
          BadgeHelper.create_bingo(this.$props.game_nid);
        }
      },

      debugShowBadgeModal: function() {
        this.badgeType = 'bingo';
        this.badgeUrl = '';
        this.badgeText = 'You earned a Bingo Badge!';
        this.badgeButtonText = 'GO FOR A BLOCKOUT';
        this.badgeModalVisible = true;
      }
    }
  }
</script>
