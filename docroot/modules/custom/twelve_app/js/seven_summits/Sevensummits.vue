<template>
  <div>
    <MountainInfoModal></MountainInfoModal>

    <router-view/>
  </div>
</template>

<script>
  import MountainInfoModal from "./components/MountainInfoModal";
  export default {
    name: 'Sevensummits',
    components: {
      MountainInfoModal
    },
    props: ['debug', 'error_message', 'summits', 'hero_config'],
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
      this.$store.state.summits = this.$props.summits;
      this.$store.state.debug = this.$props.debug;
      this.$store.state.finishes = this.summitFinishes(this.$props.summits);
    },
    methods: {
      summitFinishes: function (summits) {
        const finishes = summits.filter(function (summit) {
          return summit.exercises.length === summit.finished_exercises.length;
        });

        return finishes;
      },
    }
  }
</script>
