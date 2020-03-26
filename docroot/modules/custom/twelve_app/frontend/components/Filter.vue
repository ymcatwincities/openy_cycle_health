<template>

  <div class="activity-finder__step_content container">
    <div v-for="item in options" v-on:click="checkExcercise">
      <div class="today-progress-item">
        <input v-model="checked" type="checkbox" eclass="" name="today-progress-checkboxes">
        <div class="title">{{ item.label }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
    </div>
  </div>

</template>

<script>

  import NameForm from '../components/NameForm.vue';
  // We expect structure of Options:
  // {
  //    314: {
  //      label: "30 push up",
  //      description: "Do this excercise 5 min"
  //    },
  //    394: {
  //      label: " 40 Jumps",
  //      description: "Please do 40 jumps in "
  //  }
  export default {
    props: [
      'options'
    ],
    components: {
      NameForm
    },
    data: function() {
      return {
        checked: []
      };
    },
    created: function() {
      if (this.default != undefined) {
        this.checked = this.default.split(',');
      }
    },
    computed: {

    },
  methods: {
    checkExcercise: function() {
      console.log(this.$parent.userData);

      if (!this.$parent.userData.name) {
        this.$modal.show(NameForm);
      }
    }
  },
    watch: {
      checked: function(values) {
        let returnValues = values;
        if (typeof values == 'string') {
          returnValues = [ values ];
        }
        // Some of the values could be empty. Clean them up.
        var cleanValues = [];
        for (let key in returnValues) {
          if (returnValues[key] != '') {
            cleanValues.push(returnValues[key]);
          }
        }
        this.$emit('updated-values', cleanValues);
      }
    },
    mounted: function () {

      jQuery(function() {
        jQuery('*[data-mh="openy-card__item-label"]').matchHeight();
      });
    }
  }
</script>
