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
        <linearGradient id="mountainShadedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="50%" style="stop-color:#8a7d7c;stop-opacity:0.7" />
          <stop offset="100%" style="stop-color:#c2bebe;stop-opacity:0.7" />
        </linearGradient>
      </defs>
      <image v-bind:xlink:href="summit.main_image"
             clip-path="url(#triangleView)"
      ></image>
      <polygon points="0,600 400,10 800,600"
               style="stroke:white;stroke-width:10;"
               fill="url(#mountainGradient)"
      ></polygon>
    </svg>
    <ProgressRing
      v-if="progress < 100" :progress="progress" radius="50" stroke="6"
    ></ProgressRing>
    <Flag
      v-else :class="$store.state.jacketColor"
    ></Flag>
    <div class="info">
      <p>{{ summit.mountain }}</p>
      <p>{{ summit.elevation }}</p>
      <p>{{ summit.continent }}</p>
    </div>
    <div @click="showMountainInfoModal(summit)" class="click-base"></div>
  </div>
</template>

<script>
  import Flag from "./Flag";
  import ProgressRing from "./ProgressRing";
  import { mapMutations } from 'vuex';
  import MountainMixin from "../mixins/Mountain";

  export default {
    components: { ProgressRing, Flag },
    mixins: [ MountainMixin ],
    props: ['summit'],
    methods: {
      ...mapMutations('modalMountainInfo', {
        showMountainInfoModal: 'showModal',
      })
    }
  }
</script>
