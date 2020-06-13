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

  export default {
    components: {
      Mountain
    },
    data() {
      return {
      };
    },
    created: function () {
    },
    computed: {
      summits() {
        return this.$store.state.summits;
      }
    }
  }
</script>
