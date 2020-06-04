<template>
  <div>
    Welcome

    <router-link :to="{ name: 'Hero' }">Hero</router-link>
  </div>
</template>

<script>


  export default {
    components: {
    },
    data() {
      return {
      };
    },
    created: function () {
      console.log('welcome created');
    },
    methods: {
    },
  }
</script>
