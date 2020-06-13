<template>
  <div class="mountain">
    <svg viewBox="0 0 800 800">
      <defs>
        <clipPath id="triangleView">
          <polygon points="5,600 400,14 795,600"></polygon>
        </clipPath>
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="50%" style="stop-color:#0060AF66;stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:#92278F;stop-opacity:0.9" />
        </linearGradient>
      </defs>
      <image v-bind:xlink:href="summit.main_image" clip-path="url(#triangleView)"></image>
      <polygon points="0,600 400,10 800,600" style="stroke:white;stroke-width:10;" fill="url(#mountainGradient)"></polygon>
    </svg>
    <Flag v-if="['Elbrus','Everest'].includes(summit.mountain)"></Flag>
    <ProgressRing v-else class="progress-ring" radius="50" progress="70" stroke="6"></ProgressRing>
    <div class="info">
      <p>{{ summit.mountain }}</p>
      <p>{{ summit.elevation }}</p>
      <p>{{ summit.continent }}</p>
    </div>
    <div @click="onClick" class="click-base"></div>
  </div>
</template>

<script>
  import Flag from "./Flag";
  import ProgressRing from "./ProgressRing";
  export default {
    components: {ProgressRing, Flag},
    props: ['summit'],
    created() {
      console.log(this.summit);
    },
    methods: {
      onClick() {
        console.log(this.summit);
      },
    }
  }
</script>
