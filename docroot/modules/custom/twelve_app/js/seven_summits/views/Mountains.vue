<template>
  <div class="views-layout mountains-layout">
    <Mountain
      v-for="summit in summits"
      :summit="summit"
    ></Mountain>
  </div>
</template>

<script>
  import Mountain from "../components/Mountain";
  import { mapState } from 'vuex';

  export default {
    components: {
      Mountain
    },
    computed: {
      ...mapState([
        'summits'
      ]),
    },
  }
</script>
