<template>
    <div class="introduce-form">
      <div>Please, introduce yourself:</div>
      <input type="text" name="username" v-model="username" class="username">
      <input type="button" v-if="username !==''" v-on:click="setLogin" value="Go">
    </div>
</template>

<script>
    export default {
        data () {
            return {
                username: ''
            };
        },
        methods: {
            setLogin: function() {
                localStorage.userData.name = this.username;
                this.$modal.hide('twelve-modal');
            }
        }

    };
</script>