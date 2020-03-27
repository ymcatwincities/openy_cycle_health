<template>
  <div>
  <name-form
          v-on:toggle-introduced="toggleUserIntroduced"
  ></name-form>
  <div class="container" v-bind:class="{'visually-disabled': !userIntroduced}">
    <div class="today-progress-item" v-for="item in options" v-on:click="checkExcercise">
      <input v-model="checked" type="checkbox" class="checkbox" :id="'twelve_' + item.id" name="today-progress-checkboxes">
      <div class="title">{{ item.label }}</div>
      <div class="description" v-html="item.description"></div>
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
        checked: [],
        userIntroduced: false,
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

    checkExcercise: function(event) {

      if (!localStorage.twelveUserName) {

      
      }
    },

    toggleUserIntroduced: function() {
      this.userIntroduced = !this.userIntroduced;
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
      localStorage.twelveUserName = '';
      jQuery(function() {
        jQuery('*[data-mh="openy-card__item-label"]').matchHeight();
      });
    }
  }
</script>
