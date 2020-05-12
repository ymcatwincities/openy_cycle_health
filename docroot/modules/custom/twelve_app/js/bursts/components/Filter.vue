<template>
  <div>
    <name-form
      v-on:show-modal="nameModalVisible = true"
      v-on:hide-modal="nameModalVisible = false"
    ></name-form>

    <div class="modal fade show excercise-container" v-for="item in options"
         v-if="currentExcercise === item.id">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">BURST DETAILS</h4>
            <button type="button" class="close notranslate" aria-label="Close"
                    v-on:click="closeExerciseModal"
            ><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="description" v-html="item.description"></div>
            <div class="animation" v-if="item.gif_path"><img :src="item.gif_path"></div>
          </div>
          <div class="modal-footer">
            <div class="countdown notranslate" v-if="timerIsRunning">
              <countdown
                ref="countdown"
                :time="item.timer * 1000"
                @start="triggerTimerStart(item.id)"
                @end="triggerTimerEnd(item.id)"
                :emit-events="true"
                v-if="timerIsRunning"
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
          </div>
        </div>
      </div>
    </div>

    <div class="message">Click an activity below. Keep going until you've clicked them all!</div>

    <div class="container" v-bind:class="{'visually-disabled': nameModalVisible || exerciseModalVisible}">
      <div class="today-progress-item"
           v-for="item in options"
           v-on:click="openExerciseModal(item.id)"
           :class="{'checked': checked.includes(item.id)}"
      >
        <div
          v-bind:class="{'checked': checked.includes(item.id)}"
          class="checkbox"
        ></div>
        <div class="title">{{ item.label }}</div>
        <div class="description" v-html="item.description"></div>
      </div>
    </div>
  </div>

</template>

<script>

  import NameForm from '../components/NameForm.vue';
  import Countdown from '@chenfengyuan/vue-countdown';
  // We expect structure of Options:
  // {
  //    314: {
  //      label: "30 push up",
  //      description: "Do this excercise 5 min"
  //    },
  //    394: {
  //      label: " 40 Jumps",
  //      description: "Please do 40 jumps in "
  //  }

  /**
   * append leading zero if number is lesser then 10
   */
  Vue.filter("formatNumber", function (n) {
    return (n < 10) ? ("0" + n) : n;
  });

  export default {
    props: [
      'debug',
      'options',
      'game_nid',
      'completion_url'
    ],
    components: {
      NameForm,
      Countdown,
    },
    data: function () {
      return {
        checked: [],
        currentExcercise: 0,
        timerIsRunning: false,
        timerIsPaused: false,
        exerciseModalVisible: false,
        nameModalVisible: false
      };
    },
    created: function () {
      let cache = this.loadTodayProgressFromLocalStorage();
      for (let index = 0; index < cache.length; index++) {
        this.checked.push(cache[index]);
      }
    },
    computed: {},
    methods: {

      triggerTimerEnd: function (id) {
        if (this.checked.indexOf(id) === -1) {
          this.checked.push(id);
          this.$emit('data-update', this.checked);
          this.beep();
          this.timerIsRunning = false;

          this.saveTodayProgressToLocalStorage();

          this.$notify({
            group: 'twelve_app',
            title: 'Hooray, you have finished your exercise!',
            text: 'Now, lets have some rest.'
          });
        }
        else {
          this.checked.splice(this.checked.indexOf(id), 1);
        }
      },

      triggerTimerStart: function (id) {
        // console.log(id);
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

      openExerciseModal: function (id) {
        if (this.checked.includes(id)) {
          return;
        }

        this.currentExcercise = id;
        this.exerciseModalVisible = true;
      },

      closeExerciseModal: function () {
        this.currentExcercise = 0;
        this.timerIsRunning = false;
        this.timerIsPaused = false;
        this.exerciseModalVisible = false;

        if (this.fullyCompletedTodayExercises() && this.$props.completion_url.length > 0) {
          window.location = window.location.origin + this.$props.completion_url;
        }
      },

      fullyCompletedTodayExercises: function () {
        return (this.checked.length >= Object.keys(this.$props.options).length);
      },

      beep: function () {
         let snd = new Audio('/modules/custom/twelve_app/js/assets/disco_alarm.wav');
         snd.play();
      },

      saveTodayProgressToLocalStorage: function () {
        let key = "progress" + this.$props.game_nid;
        let value = JSON.stringify(Array.from(this.checked.values()));

        localStorage.setItem(key, value);
      },

      loadTodayProgressFromLocalStorage: function () {
        let key = "progress" + this.$props.game_nid;
        let cache = localStorage.getItem(key);
        if (cache === null) {
          cache = [];
        }
        else {
          cache = JSON.parse(cache);
        }

        return cache;
      }
    },
    watch: {
      checked: function (values) {

      }
    },
    mounted: function () {

    }
  }
</script>
