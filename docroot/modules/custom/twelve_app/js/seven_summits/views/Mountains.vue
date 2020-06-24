<template>
  <div class="views-layout"
    :class="{'seven-summits-conquered': this.mountains_conquered === 7}"
  >
    <Greeting></Greeting>
    <div class="mountains-layout">
      <Mountain
        v-for="summit in summits"
        :summit="summit"
      ></Mountain>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Mountain from "../components/Mountain";
  import Greeting from "../components/Greeting";

  export default {
    components: {
      Greeting,
      Mountain,
    },
    computed: {
      ...mapState([
        'summits',
        'mountains_conquered'
      ]),
    },
  }
</script>
