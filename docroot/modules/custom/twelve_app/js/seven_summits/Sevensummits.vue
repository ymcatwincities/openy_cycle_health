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
    props: ['debug', 'error_message', 'summits'],
    data() {
      return {
      };
    },
    created: function () {
      console.log(this.summits);
    },
  }

</script>
