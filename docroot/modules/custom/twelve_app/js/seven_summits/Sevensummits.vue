<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'Sevensummits',
    components: {
    },
    props: ['debug', 'error_message', 'summits', 'hero_config'],
    data() {
      return {
      };
    },
    created: function () {
      this.$store.state.jacketColor = this.$props.hero_config.jacketColor ? this.$props.hero_config.jacketColor : 'green';
      this.$store.state.fleshTone = this.$props.hero_config.fleshTone ? this.$props.hero_config.fleshTone : 'tone-1';
      this.$store.state.summits = this.$props.summits;
      if (process.env.DEBUG) {
        this.summits.forEach(el => console.log(el.main_image));
      }
    },
  }

</script>
