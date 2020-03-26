<template>
 <main-filter :options="excercisesOptions"></main-filter>

</template>

<script>
    import Spinner from '../components/Spinner.vue'
    import MainFilter from '../components/Filter.vue'

    export default {
        props: ['excercises'],
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
          if (localStorage.name) this.userData.name = localStorage.name;
        },
        computed: {
            excercisesOptions: function() {
                var options = {};
                console.log(this.excercises);
                for (var i in this.excercises) {
                    var item = this.excercises[i];
                    options[i] = {
                        'label': item.label,
                        'description': item.description
                    };
                }

                return options;
            }
        }
    }
</script>