<template>
  <div>
    <div class="seven-summits__overlay"></div>
    <div class="seven-summits__bg-image"></div>
    <div class="container">
      <div class="d-flex flex-column h-100 text-center">

        <div class="seven-summits__heading">
          7 SUMMITS
        </div>

        <div class="seven-summits__climbers">
          <div class="climber climber-l1 climber-blue"></div>
          <div class="climber climber-l2 climber-green"></div>
          <div class="climber climber-l3 climber-purple"></div>
          <div class="climber climber-l2 climber-red"></div>
          <div class="climber climber-l1 climber-yellow"></div>
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
  }
</script>
