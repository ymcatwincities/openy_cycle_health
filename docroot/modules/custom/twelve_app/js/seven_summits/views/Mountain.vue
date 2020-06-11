<template>
  <div>
    <div class="mountain">
      <div class="seven-summits__overlay"></div>
      <div class="seven-summits__bg-image"></div>

      <div class="container">
        <div class="d-flex flex-column h-100">
          <div class="mountain-wrap position-relative w-100">

            <div class="mountain__progress">
              <h4>{{ mountain[1] }}</h4>
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{width: complited()}" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-count">{{ complited() }} Complete</div>
              <div class="progress-info">{{ mountain[0] }} Summit | {{ mountain[2] }} Finishes</div>
            </div>

            <div class="mountain__view h-100">

              <div class="mountain__view-triangle">
                <div class="mountain__view-mess">
                  <div :class="['hero', $store.state.jacketColor, $store.state.fleshTone]">
                    <Climber></Climber>
                  </div>
                  <div class="mountain__view-avatar position-absolute"></div>
                  <span>YOU REACHED THE SUMMIT!</span>
                </div>

                <svg width="245" height="250" viewBox="0 0 245 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs xmlns="http://www.w3.org/2000/svg">
                    <pattern id="mountain-img" patternUnits="userSpaceOnUse" width="300" height="300">
                      <image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/themes/custom/twelve_carnation/dist/img/mountains/aconcagua.jpg" x="0" y="0" width="300" height="300"/>
                    </pattern>
                  </defs>
                  <path d="M122.5 3L228.588 188.25H16.4119L122.5 3Z" fill="url(#mountain-img)"/>
                  <line x1="17.5659" y1="186.752" x2="121.566" y2="4.75193" stroke="white"/>
                  <line x1="227" y1="188.5" x2="18" y2="188.5" stroke="white"/>
                  <line x1="122.434" y1="2.75218" x2="227.434" y2="186.752" stroke="white"/>
                  <circle cx="18" cy="187" r="4.5"  :fill="finished_exercises[0] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="26" cy="172" r="4.5"  :fill="finished_exercises[1] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="35" cy="157" r="4.5" :fill="finished_exercises[2] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="43" cy="142" r="4.5" :fill="finished_exercises[3] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="52" cy="127" r="4.5" :fill="finished_exercises[4] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="60" cy="112" r="4.5" :fill="finished_exercises[5] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="68" cy="98" r="4.5" :fill="finished_exercises[6] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="77" cy="83" r="4.5" :fill="finished_exercises[7] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="85" cy="68" r="4.5" :fill="finished_exercises[8] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="94" cy="53" r="4.5" :fill="finished_exercises[9] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="103" cy="38" r="4.5" :fill="finished_exercises[10] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="111" cy="23" r="4.5" :fill="finished_exercises[11] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="122" cy="5" r="4.5" :fill="finished_exercises[12] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="138" cy="29" r="4.5" :fill="finished_exercises[13] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="150" cy="51" r="4.5" :fill="finished_exercises[14] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="163" cy="73" r="4.5" :fill="finished_exercises[15] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="176" cy="96" r="4.5" :fill="finished_exercises[16] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="190" cy="120" r="4.5" :fill="finished_exercises[17] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="202" cy="142" r="4.5" :fill="finished_exercises[18] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="214" cy="163" r="4.5" :fill="finished_exercises[19] ? '#92278f' : 'white'" stroke="white"/>
                  <circle cx="227" cy="187" r="4.5" :fill="finished_exercises[20] ? '#92278f' : 'white'" stroke="white"/>
                </svg>
              </div>
            </div>

            <div class="mountain__next d-flex flex-wrap">
              <div class="bruch-label">UP NEXT ...</div>
              <div class="bruch-name">Brush name</div>
              <div class="bruch-text">Regular Brush</div>
              <router-link to="/" class="bruch-btn"><span>Let's</span> go</router-link>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Climber from "../components/Climber.vue";

  export default {
    components: {
      Climber
    },
    data() {
      return {
        mountain: [1, 'Aconcagua', 0],
        finished_exercises: [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
      };
    },
    created: function() {

    },
    methods: {
      complited: function () {
        const complited = this.finished_exercises.filter(exercise => {
          return exercise === true
        }).length / 21 * 100

        return Math.round(complited) + '%'
      }
    }
  }
</script>
