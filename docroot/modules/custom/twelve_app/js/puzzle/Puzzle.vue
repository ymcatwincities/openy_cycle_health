<template>
  <div>
    <Greeting
      v-on:show-modal="nameModalVisible = true"
      v-on:hide-modal="nameModalVisible = false"
    ></Greeting>

    <ExerciseList
      :game_nid="game_nid"
      :progress_nid="progress_nid"
      :exercise_list="excercisesOptions"
      :finished_exercises="finished_exercises"
    ></ExerciseList>
    <notifications group="twelve_app"></notifications>
  </div>
</template>

<script>
  import Greeting from './components/Greeting.vue';
  import ExerciseList from '../components/ExerciseList.vue';
  import Spinner from '../../components/Spinner.vue'
  import twelve from '../../app/twelve';

  export default {
    props: ['game_nid', 'progress_nid', 'excercise_list', 'finished_exercises', 'completion_url'],
    data() {
      return {
        checkedExcercises: [],
        userData: {
          'name': '',
        },
        isStepNextDisabled: true
      };
    },
    created: function () {
      twelve.local_storage.set_progress_nid(drupalSettings.user.uid, this.$props.game_nid, this.$props.progress_nid);
    },
    components: {
      ExerciseList,
      Spinner,
    },
    computed: {
      excercisesOptions: function () {
        var options = {};
        var index = 1;
        for (var i in this.excercise_list) {
          var item = this.excercise_list[i];

          options[i] = {
            'label': item.label,
            'description': item.description,
            'timer': item.timer,
            'gif_path': item.gif,
            'id': item.id,
            'puzzle_image_url': item.puzzle_image_url,
            'index_number': index++
          };
        }

        return options;
      }
    }
  }
</script>
