<template>
  <Modal
    :title="exercise.label"
    :close_handler="closeExerciseModal"
  >
    <template #body>
      <div class="description" v-html="exercise.description"></div>
      <div class="animation" v-if="exercise.gif_path"><img :src="exercise.gif_path"></div>
    </template>
    <template #footer>
      <div class="countdown notranslate" v-if="timerIsRunning">
        <countdown
          v-if="timerIsRunning"
          ref="countdown"
          :time="exercise.timer * 1000"
          @end="triggerTimerEnd(exercise.id)"
          :emit-events="true"
        >
          <template
            slot-scope="props"
          >{{ props.minutes | formatNumber }}:{{ props.seconds | formatNumber }}
          </template>
        </countdown>
      </div>
      <button type="button" class="btn btn-blue notranslate"
              v-if="timerIsRunning"
              @click="toggleTimerPause"
      >
        <template v-if="timerIsPaused">CONTINUE</template>
        <template v-else>PAUSE</template>
      </button>
      <button type="button" class="btn btn-gold notranslate"
              v-if="checked.includes(item.id)"
              @click="closeExerciseModal"
      >
        <img src="/themes/custom/twelve_carnation/dist/img/task-gold.png"></img>
        COMPLETE
      </button>
      <button type="button" class="btn btn-default notranslate"
              v-if="!timerIsRunning && !checked.includes(item.id)"
              @click="timerIsRunning = true"
      >
        READY … SET … GO!
      </button>
    </template>
  </Modal>
</template>

<script>
  import Modal from "../../components/Modal";
  import Countdown from '@chenfengyuan/vue-countdown';
  import twelve from "../../app/twelve";

  export default {
    props: [
      'game_nid',
      'progress_nid',
      'exercise_list',
      'finished_exercises',
      'exercise'
    ],
    components: {
      Modal,
      Countdown
    },
    data: function () {
      twelve.local_storage.save_today_progress(this.$props.progress_nid, this.$props.finished_exercises);
      return {
        timerIsRunning: false,
        timerIsPaused: false,
        exerciseModalVisible: false,
        nameModalVisible: false
      };
    },
    methods: {
      closeExerciseModal: function () {
        this.$props.exercise = null;
        this.timerIsRunning = false;
        this.timerIsPaused = false;
        this.exerciseModalVisible = false;

        if (this.fullyCompletedTodayExercises()) {
          window.location = window.location.origin + '/user';
        }
      },
      triggerTimerEnd: function (id) {
        if (this.$props.finished_exercises.indexOf(id) === -1) {
          this.checked.push(id);
          this.beep();
          this.timerIsRunning = false;

          twelve.local_storage.save_today_progress($this.$props.progress_nid, Array.from(this.checked.values()));
          twelve.send_progress(
            drupalSettings.user.uid,
            this.$props.game_nid,
            this.$props.progress_nid,
            this.checked,
          );

          this.$notify({
            group: 'twelve_app',
            title: 'Hooray, you have finished your excercise!',
            text: 'Now, lets have some rest.'
          });
        }
        else {
          this.checked.splice(this.checked.indexOf(id), 1);
        }
      },

      toggleTimerPause: function () {
        if (this.timerIsPaused) {
          this.$refs.countdown[0].start();
          this.timerIsPaused = false;
        } else {
          this.$refs.countdown[0].abort();
          this.timerIsPaused = true;
        }
      },

      beep: function () {
        let snd = new Audio('/modules/custom/twelve_app/js/app/assets/disco_alarm.wav');
        snd.play();
      },

      fullyCompletedTodayExercises: function () {
        return (this.$props.finished_exercises.length >= Object.keys(this.$props.exercise_list).length);
      },
    },
    filters: {
      /**
       * append leading zero if number is lesser then 10
       */
      formatNumber: function (n) {
        return (n < 10) ? ("0" + n) : n;
      }
    }
  }
</script>


