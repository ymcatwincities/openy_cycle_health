<template>
  <div>
    <LoginRequiredModal></LoginRequiredModal>
    <MountainInfoModal></MountainInfoModal>

    <router-view/>
  </div>
</template>

<script>
  import MountainInfoModal from "./components/MountainInfoModal";
  import LoginRequiredModal from "./components/LoginRequiredModal";

  export default {
    name: 'Sevensummits',
    components: {
      LoginRequiredModal,
      MountainInfoModal
    },
    props: ['debug', 'error_message', 'summits', 'hero_config', 'summits_reached', 'mountains_conquered'],
    data() {
      return {
      };
    },
    created: function () {
      if (this.$props.hero_config.jacketColor !== null) {
        this.$store.state.heroSelected = true;
      }
      this.$store.state.jacketColor = this.$props.hero_config.jacketColor ? this.$props.hero_config.jacketColor : 'green';
      this.$store.state.fleshTone = this.$props.hero_config.fleshTone ? this.$props.hero_config.fleshTone : 'tone-1';
      this.$store.state.summits_reached = this.$props.summits_reached ? this.$props.fleshTone : '0';
      this.$store.state.mountains_conquered = this.$props.mountains_conquered ? this.$props.mountains_conquered : '0';
      this.$store.state.summits = this.$props.summits;
      this.$store.state.debug = this.$props.debug;
    },
  }
</script>
