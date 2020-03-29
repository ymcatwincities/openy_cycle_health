<template>
 <div>
 <main-filter
         :options="excercisesOptions"
         :current_nid="current_nid"
         v-on:data-update="sendData"
 ></main-filter>
 <notifications group="twelve_app"></notifications>
 </div>
</template>

<script>
    import Spinner from '../components/Spinner.vue'
    import MainFilter from '../components/Filter.vue'

    export default {
        props: ['excercises', 'current_nid'],
        data () {
            return {
                checkedExcercises: [],
                userData: {
                 'name': '',
                },
                isStepNextDisabled: true
            };
        },
        components: {
            Spinner,
            MainFilter
        },
        mounted() {
          console.log(this.current_nid);
        },
        methods: {

          sendData: function (checked) {
            //@TODO add axios request to drupal.
          }

        },
        computed: {
            excercisesOptions: function() {
                var options = {};
                console.log(this.excercises);
                for (var i in this.excercises) {
                    var item = this.excercises[i];
                    options[i] = {
                        'label': item.label,
                        'description': item.description,
                        'id': i,
                    };
                }
                return options;
            }
        }
    }
</script>
