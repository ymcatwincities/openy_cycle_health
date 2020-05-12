<template>
  <div>
    <div class="message">Click an activity below. Keep going until you've clicked them all!</div>

    <div class="container" v-bind:class="{'visually-disabled': nameModalVisible || selected_exercise}">
      <div class="today-progress-item"
           v-for="exercise in exercise_list"
           v-on:click="exerciseSelected(exercise)"
           :class="{'checked': finished_exercises.includes(exercise.id)}"
      >
        <div v-if="finished_exercises.includes(exercise.id)"
             :style="{ backgroundImage: `url('${exercise.puzzle_image_url}')` }">
        </div>
        <template v-else>{{ exercise.index_number }}</template>
      </div>
    </div>
  </div>
</template>

<script>
  import twelve from "../../app/twelve";

  export default {
    props: [
      'game_nid',
      'progress_nid',
      'exercise_list',
      'finished_exercises'
    ],
    components: {
      NameForm,
      ExerciseModal,
    },
    data: function () {
      return {
        selected_exercise: null,
        nameModalVisible: false
      };
    },
    created: function () {
      if (this.$props.finished_exercises.length === 0) {
        let cache = twelve.local_storage.load_today_progress($this.$props.progress_nid);
        for (let index = 0; index < cache.length; index++) {
          this.$props.finished_exercises.push(cache[index]);
        }
      }
    },
    computed: {},
    methods: {
      exerciseSelected: function (exercise) {
        if (this.$props.finished_exercises.includes(id)) {
          return;
        }

        this.selected_exercise = exercise;
      },
      exerciseClosed: function(exercise) {

      }
    }
  }
</script>
