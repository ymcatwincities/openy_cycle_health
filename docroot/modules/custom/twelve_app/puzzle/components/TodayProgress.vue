<template>
    <div>
        <main-filter
                :options="excercisesOptions"
                :game_nid="game_nid"
                :progress_nid="progress_nid"
                :finished_items="finished_items"
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
        props: ['excercises', 'game_nid', 'progress_nid', 'completion_url', 'finished_items'],
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
          this.setProgressNid(this.$props.progress_nid);
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
                        'value': this.$props.game_nid,
                    },
                    'field_finished_items': checked
                };

                let result_nid = this.getProgressNid();
          
                if (result_nid > 0) {
                    result_url += '/' + result_nid;
                    request_type = 'patch';
                }

                axios({url: '/session/token'}).then(token_data => {

                    let token = token_data.data;

                    axios({
                        method: request_type,
                        url: result_url,
                        data: data,
                        headers: {
                            "X-CSRF-Token": token
                        },
                    }).then(function (response) {
                        let progress_nid = response.data.nid[0].value;
                        this.setProgressNid(progress_nid);
                    }.bind(this)).catch(function (error) {
                        //@TODO Add error handler
                    });

                }).catch(function (error) {

                });

            },


            getLocalStorageKey: function () {
                return 'progress_nid_for_' + this.$props.game_nid + '_' + drupalSettings.user.uid;
            },

            getProgressNid: function() {
              let result_key = this.getLocalStorageKey();
              return localStorage.getItem(result_key);
            },

            setProgressNid: function(nid) {
              let result_key = this.getLocalStorageKey();
              localStorage.setItem(result_key, nid);
            }
        },
        computed: {
            excercisesOptions: function () {
                var options = {};
                var index = 1;
                for (var i in this.excercises) {
                    var item = this.excercises[i];

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
