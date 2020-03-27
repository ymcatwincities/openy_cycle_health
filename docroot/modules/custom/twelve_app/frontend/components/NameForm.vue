<template>
    <div class="introduce-form">

      <div class="user-name-container" v-if="userIntroduced">
          <span>Hi, {{ username }}</span>
          <button v-on:click="toggleStatus">Change name</button>
      </div>

      <div class="user-login-container" v-if="!userIntroduced">
        <div class="login-message">Please, enter your name:</div>
        <input type="text" name="username" v-model="username" class="username">
        <input type="button" v-if="username !==''" v-on:click="setLogin" value="Go">
      </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                username: (localStorage.twelveUserName === '' ? '' : localStorage.twelveUserName),
                userIntroduced: (localStorage.twelveUserName === '' ? false : true),
            };
        },
        methods: {

            toggleStatus: function() {
                this.userIntroduced = false;
                this.$emit('toggle-introduced');
            },

            setLogin: function() {

                localStorage.twelveUserName = this.username;
                this.userIntroduced = true;
                this.$emit('toggle-introduced');

                this.$notify({
                    group: 'twelve_app',
                    title: 'You have introduced yourself',
                    text: 'Lets start training!'
                });
            }
        }

    };
</script>