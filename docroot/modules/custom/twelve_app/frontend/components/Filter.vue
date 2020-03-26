<template>

  <div class="activity-finder__step_content container">
    <div v-for="item in options">
      <div class="title">{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
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
      console.log(this.options);
      jQuery(function() {
        jQuery('*[data-mh="openy-card__item-label"]').matchHeight();
      });
    }
  }
</script>
