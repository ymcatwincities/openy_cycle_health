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
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: {
      Mountain
    },
    data() {
      return {
      };
    },
    created: function () {
      this.$store.commit('modalMountainInfo/showModal', this.summits[0]);
    },
    computed: {
      summits() {
        return this.$store.state.summits;
      },

      ...mapState({
        modal: state => state.modalMountainInfo.modal
      })
    },
  }
</script>
