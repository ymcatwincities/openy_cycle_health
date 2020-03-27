<template>
  <div>
  <name-form
          v-on:toggle-introduced="toggleUserIntroduced"
  ></name-form>
  <div class="container" v-bind:class="{'visually-disabled': !userIntroduced}">
    <div class="today-progress-item" v-for="item in options" v-on:click="checkExcercise(item.id)" :class="{'checked': checked.includes(item.id)}">
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

    checkExcercise: function(id) {
      if (localStorage.twelveUserName !== '') {
        if (this.checked.indexOf(id) === -1) {
          this.checked.push(id);
        } else {
          this.checked.splice(this.checked.indexOf(id), 1);
        }
      }
    },

    toggleUserIntroduced: function() {
      this.userIntroduced = !this.userIntroduced;
    }

  },
    watch: {
      checked: function(values) {

      }
    },
    mounted: function () {
      //localStorage.twelveUserName = '';
    }
  }
</script>
