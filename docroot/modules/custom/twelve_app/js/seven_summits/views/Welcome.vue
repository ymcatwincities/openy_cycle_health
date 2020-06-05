<template>
  <div>
    <div class="seven-summits__overlay"></div>
    <div class="seven-summits__bg-image"></div>
    <div class="container">
      <div class="d-flex flex-column h-100 text-center">
        <div class="seven-summits__y-logo">
          <img src="/themes/custom/twelve_carnation/dist/img/y-grey-logo.svg">
        </div>

        <div class="seven-summits__heading">
          7 SUMMITS
        </div>

        <div class="seven-summits__climbers">
          <div class="climber climber-l1 climber-1a"></div>
          <div class="climber climber-l2 climber-1b"></div>
          <div class="climber climber-l3 climber-1c"></div>
          <div class="climber climber-l2 climber-1d"></div>
          <div class="climber climber-l1 climber-1e"></div>
        </div>

        <div class="seven-summits__sub-heading d-flex flex-column flex-sm-row flex-lg-column">
          Get ready to climb the highest mountain on each continent!
          <router-link to="/hero" class="seven-summits__start">Start</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    components: {
    },
    data() {
      return {
        showMenu: false,
      };
    },
    created: function () {
      console.log('welcome created');
    },
    methods: {
    },
  }
</script>
