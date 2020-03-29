<template>
  <div class="introduce-form">

    <div class="user-name-container" v-if="userIntroduced">
      <span>Hi, {{ username }}</span>
      <button v-on:click="showModal">Change name</button>
    </div>

    <div class="user-login-container" v-if="!userIntroduced">
      <div class="window">
        <div class="login-message">Please, enter your name:</div>
        <input type="text" name="username" v-model="username" class="username">
        <input type="button" v-if="username !==''" v-on:click="setLogin" value="Go">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      let name = this.loadNameFromCache();
      console.log(this.isName(name));
      return {
        userIntroduced: this.isName(name),
        username: name,
      };
    },
    created() {
      this
    },
    methods: {
      loadNameFromCache: function() {
        let name = localStorage.twelveUserName;
        if(!this.isName(name)) {
          this.$emit('show-modal');
        }
        return name;
      },

      isName: function(name) {
        if (typeof name === "string" && name.length > 0) {
          return true;
        } else {
          return false;
        }
      },

      showModal: function () {
        this.userIntroduced = false;
        this.$emit('show-modal');
      },

      setLogin: function () {
        localStorage.twelveUserName = this.username;
        this.userIntroduced = true;
        this.$emit('hide-modal');

        this.$notify({
          group: 'twelve_app',
          title: 'You have introduced yourself',
          text: 'Lets start training!'
        });
      }
    }
  };
</script>
