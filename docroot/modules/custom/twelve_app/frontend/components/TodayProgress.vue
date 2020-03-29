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

    const axios = require('axios');

    export default {
        props: ['excercises', 'current_nid'],
        data() {
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
            MainFilter,
        },
        mounted() {

        },
        methods: {

            sendData: function (checked) {

                let result_url = window.location.origin + '/node';
                let request_type = 'post';

                let data = {
                    'type': '12_bursts_result',
                    'title': {
                        'value': localStorage.twelveUserName
                    },
                    'field_when': {
                        'value': this.current_nid,
                    },
                    'field_finished_items': checked
                };

                if (localStorage.current_result_nid) {
                    result_url += '/' + localStorage.current_result_nid;
                    request_type = 'patch';
                }

                axios({
                    method: request_type,
                    url: result_url,
                    data: data,
                    //@TODO create real user here
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).
                  then(function (response) {
                    localStorage.current_result_nid = response.data.nid[0].value;

                }).catch(function (error) {
                    //@TODO Add error handler
                });

            }

        },
        computed: {
            excercisesOptions: function () {

                var options = {};

                for (var i in this.excercises) {
                    var item = this.excercises[i];
                    options[i] = {
                        'label': item.label,
                        'description': item.description,
                        'timer': item.timer,
                        'gif': item.gif,
                        'id': i,
                    };
                }

                return options;
            }
        }
    }
</script>
