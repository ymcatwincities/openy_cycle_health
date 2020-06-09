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
      console.log(this.summits);
    },
  }

</script>
