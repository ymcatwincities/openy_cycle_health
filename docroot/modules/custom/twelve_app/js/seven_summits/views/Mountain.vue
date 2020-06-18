<template>
  <div>
    <div class="views-mountain mountain">
      <div class="seven-summits__overlay"></div>
      <div class="seven-summits__bg-image"></div>

      <div class="container">
        <div class="d-flex flex-column h-100">
          <div class="mountain-wrap position-relative w-100">

            <router-link to="/mountains" class="mountain-btn-back position-absolute"></router-link>

            <div class="mountain__progress">
              <h4>{{ summit.mountain }}</h4>
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{width: `${progress}%`}" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-count">{{ progress }}% Complete</div>
              <div class="progress-info">{{ summits_reached }} Summit | {{ mountains_conquered }} Finishes</div>
            </div>

            <div class="mountain__view h-100">

              <div class="mountain__view-triangle">
                <div class="mountain__view-wrap avatar">
                  <Climber :class="['hero', $store.state.jacketColor, $store.state.fleshTone]"></Climber>
                </div>

                <div v-if="summit.finished_exercises.length !== 0 && summit.exercises.length === summit.finished_exercises.length" class="mountain__view-wrap text">
                  <span>YOU REACHED THE SUMMIT!</span>
                </div>

                <svg id="mountain-view" width="245" height="250" viewBox="0 0 245 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs xmlns="http://www.w3.org/2000/svg">
                    <pattern id="mountain-img" patternUnits="userSpaceOnUse" width="300" height="300">
                      <image xmlns:xlink="http://www.w3.org/1999/xlink" :href="summit.main_image" x="0" y="0" width="300" height="300"/>
                    </pattern>
                  </defs>
                  <path d="M122.5 3L228.588 188.25H16.4119L122.5 3Z" fill="url(#mountain-img)"/>
                  <line x1="17.5659" y1="186.752" x2="121.566" y2="4.75193" stroke="white"/>
                  <line x1="227" y1="188.5" x2="18" y2="188.5" stroke="white"/>
                  <line x1="122.434" y1="2.75218" x2="227.434" y2="186.752" stroke="white"/>
                  <circle cx="18" cy="187" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[0] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="26" cy="172" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[1] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="35" cy="157" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[2] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="43" cy="142" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[3] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="52" cy="127" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[4] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="60" cy="112" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[5] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="68" cy="98" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[6] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="77" cy="83" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[7] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="85" cy="68" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[8] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="94" cy="53" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[9] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="103" cy="38" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[10] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="111" cy="23" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[11] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="122" cy="5" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[12] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="138" cy="29" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[13] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="150" cy="51" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[14] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="163" cy="73" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[15] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="176" cy="96" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[16] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="190" cy="120" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[17] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="202" cy="142" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[18] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="214" cy="163" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[19] !== 'undefined'}" fill="white" stroke="white"/>
                  <circle cx="227" cy="187" r="4.5" :class="{'finished_color': typeof summit.finished_exercises[20] !== 'undefined'}" fill="white" stroke="white"/>
                </svg>
              </div>
            </div>

            <div v-if="!fullyCompletedTodayExercises()" class="mountain__next d-flex flex-wrap">
              <div class="burst-label">UP NEXT ...</div>
              <div class="burst-name">{{ currentExercise['label'] }}</div>
              <div class="burst-text">{{ currentExercise['label'] }}</div>
              <div v-on:click="onExerciseSelected" class="burst-btn"><span>Let's</span> go</div>
            </div>

          </div>
        </div>
      </div>

      <ExerciseModal
        class="exercise-modal"
        :exercise="currentExercise"
        :exercise-modal-visible="exerciseModalVisible"
        :is-exercise-finished="isExerciseFinished"
        :on-exercise-finished="onExerciseFinished"
        :on-exercise-closed="onExerciseClosed"
        :btn-text="btnText"
        :debug="debug"
      ></ExerciseModal>
    </div>
  </div>
</template>

<script>
  import Climber from "../components/Climber.vue";
  import twelve from '../../helper/twelve';
  import ExerciseModal from '../../components/ExerciseModal.vue';
  import Spinner from '../../components/Spinner.vue'
  import BadgeHelper from '../../helper/twelve/user/badge';
  import MountainMixin from "../mixins/Mountain";
  import { mapState, mapMutations } from "vuex";

  export default {
    components: {
      Climber,
      ExerciseModal,
      Spinner,
    },
    mixins: [ MountainMixin ],
    data() {
      twelve.local_storage.save_today_progress(this.$store.state.summits[this.$route.params.id].progress_nid, this.$store.state.summits[this.$route.params.id].finished_exercises);

      return {
        currentExercise: {},
        btnText: 'START BURSTING',
        exerciseModalVisible: false,
        summits: null,
        summit: null,
        debug: null,
      };
    },
    created: function() {
      // Get all mountains.
      this.summits = this.$store.state.summits;
      // Get current mountain.
      this.summit = this.$store.state.summits[this.$route.params.id];

      this.debug = this.$store.state.debug;
      twelve.local_storage.set_user_name(twelve.user.get_active_player_name());
      this.setUpNextExercise();
    },
    computed: {
      ...mapState([
        'summits_reached',
        'mountains_conquered'
      ]),
    },
    methods: {
      ...mapMutations([
        'incrementSummitsReached',
        'incrementMountainsConquered',
      ]),
      setUpNextExercise() {
        for (let i = 0; i < this.summit.exercises.length; i++) {
          if (!this.isExerciseFinished(this.summit.exercises[i])) {
            this.currentExercise = this.summit.exercises[i];
            break;
          }
        }
      },
      onExerciseSelected: function () {
        this.exerciseModalVisible = true;
      },
      onExerciseClosed: function () {
        this.exerciseModalVisible = false;

        if (this.fullyCompletedTodayExercises()) {
          BadgeHelper.create_conquered_mountain(this.summit.game_id);
          this.incrementMountainsConquered();
          this.$router.push({ name: "Mountains"});
        }
      },
      isExerciseFinished: function(exercise) {
        return this.summit.finished_exercises.includes(exercise.id);
      },
      onExerciseFinished(exercise) {
        this.summit.finished_exercises.push(exercise.id);

        this.setUpNextExercise();

        this.beep();

        twelve.local_storage.save_today_progress(this.summit.progress_nid, Array.from(this.summit.finished_exercises.values()));
        twelve.send_progress(
          this.summit.game_id,
          this.summit.progress_nid,
          this.summit.finished_exercises,
        );

        if (this.summit.finished_exercises.length === 13) {
          BadgeHelper.create_summit_reached(this.summit.game_id);
          this.incrementSummitsReached();
        }

        this.$notify({
          group: 'twelve_app',
          title: 'Hooray, you have finished your exercise!',
          text: 'Now, lets have some rest.'
        });

        this.onExerciseClosed();
      },
      beep: function () {
        let snd = new Audio('/modules/custom/twelve_app/assets/disco_alarm.wav');
        snd.play();
      },
      fullyCompletedTodayExercises: function () {
        return (this.summit.finished_exercises.length >= Object.keys(this.summit.exercises).length);
      },
    }
  }
</script>
