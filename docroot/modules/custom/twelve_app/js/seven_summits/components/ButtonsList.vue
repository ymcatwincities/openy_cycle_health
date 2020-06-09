<template>
  <div>
    <div
      v-for="button in buttonsClasses"
      :class="[button, {selected: button == selected}]"
      @click="onClick"
    ></div>
  </div>
</template>

<script>
  export default {
    props: {
      buttonsClasses: Array,
      mutation: String,
      selected: String
    },
    methods: {
      onClick(event) {
        this.$store.commit(this.mutation, event.target.classList[0]);
      }
    }
  }
</script>
