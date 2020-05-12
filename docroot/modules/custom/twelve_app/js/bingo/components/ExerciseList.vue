<template>
  <div>
    <div class="message">Click an activity below. Keep going until you've clicked them all!</div>
    <div class="container" v-bind:class="{'visually-disabled': disabled}">
      <div class="today-progress-item"
           v-for="exercise in exerciseList"
           v-on:click="onExerciseSelected(exercise)"
           :class="{'checked': isExerciseFinished(exercise)}"
      >
        <div v-if="isExerciseFinished(exercise)"
             :style="{ backgroundImage: `url('${exercise.puzzle_image_url}')` }">
        </div>
        <template v-else>{{ exercise.index_number }}</template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      exerciseList: Array,
      isExerciseFinished: Function,
      onExerciseSelected: Function,
      disabled: Boolean
    },
  }
</script>
