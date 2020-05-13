<template>
  <Modal :title="exercise.label" :close_handler="onModalClosed"
    v-if="exerciseModalVisible"
  >
    <template #body>
      <div class="description" v-html="exercise.description"></div>
      <div class="animation" v-if="exercise.gif_path"><img :src="exercise.gif_path"></div>
    </template>
    <template #footer>
      <div class="countdown notranslate"
           v-if="timerIsRunning"
      >
        <countdown
          v-if="timerIsRunning"
          ref="countdown"
          :time="time"
          @end="triggerTimerEnd(exercise.id)"
          :emit-events="true"
        >
          <template
            slot-scope="props"
          >{{ props.minutes | appendLeadingZero }}:{{ props.seconds | appendLeadingZero }}
          </template>
        </countdown>
      </div>
      <button type="button" class="btn btn-default notranslate"
              v-if="!timerIsRunning && !isExerciseFinished(exercise)"
              @click="timerIsRunning = true"
      >
        READY … SET … GO!
      </button>
      <button type="button" class="btn btn-blue notranslate"
        v-if="timerIsRunning"
        @click="toggleTimerPause"
      >
        {{ timerIsPaused ? 'CONTINUE' : 'PAUSE'}}
      </button>
      <button type="button" class="btn btn-gold notranslate"
        v-if="isExerciseFinished(exercise)"
        @click="onModalClosed"
      >
        <img src="/themes/custom/twelve_carnation/dist/img/task-gold.png"></img>
        COMPLETE
      </button>
      <button type="button" class="btn btn-blue notranslate mt-3"
              v-if="debug"
              @click="debugTimer = !debugTimer"
      >
        {{ debugTimer ? 'Type: Short time' : 'Type: Full time' }}
      </button>

    </template>
  </Modal>
</template>

<script>
  import Modal from "./Modal.vue";
  import Countdown from '@chenfengyuan/vue-countdown';

  export default {
    props: {
      exercise: Object,
      exerciseModalVisible: Boolean,
      isExerciseFinished: Function,
      onExerciseFinished: Function,
      onExerciseClosed: Function,
      debug: Boolean
    },
    components: {
      Modal,
      Countdown
    },
    data: function () {
      return {
        timerIsRunning: false,
        timerIsPaused: false,
        debugTimer: false
      };
    },
    methods: {
      onModalClosed: function() {
        this.timerIsRunning = false;
        this.timerIsPaused = false;
        this.$props.onExerciseClosed(this.$props.exercise);
      },
      triggerTimerEnd: function () {
        this.timerIsRunning = false;
        this.$props.onExerciseFinished(this.$props.exercise);
      },
      toggleTimerPause: function () {
        if (this.timerIsPaused) {
          this.$refs.countdown.start();
          this.timerIsPaused = false;
        } else {
          this.$refs.countdown.abort();
          this.timerIsPaused = true;
        }
      }
    },
    computed: {
      time: function () {
        return this.debugTimer ? 3000 : this.exercise.timer * 1000;
      }
    },
    filters: {
      appendLeadingZero: function (n) {
        // append leading zero if number is lesser then 10
        return (n < 10) ? ("0" + n) : n;
      }
    }
  }
</script>


