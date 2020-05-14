<template>
  <div>
    <div class="message">Click an activity below. Keep going until you've clicked them all!</div>
    <div class="container" v-bind:class="{'visually-disabled': disabled}">
      <div class="today-progress-item"
           v-for="exercise in exerciseList"
           v-on:click="onExerciseSelected(exercise)"
           :class="{'checked': isExerciseFinished(exercise)}"
      >
        <template v-if="!isExerciseFinished(exercise)">
          {{ captions[exercise.index_number-1] }}
        </template>
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
    data: function () {
      return {
        captions: this.getBingoCaptions(),
      }
    },
    methods: {
      getBingoCaptions: function () {
        let captions = [];
        let word = ['B','I','N','G','O'];
        for (let i = 1; i < 6; i++) {
          for (let j = 0; j < 5; j++) {
            let val = word[j] + String(i);
            captions.push(val);
          }
        }
        return captions;
      }
    }
  }
</script>
