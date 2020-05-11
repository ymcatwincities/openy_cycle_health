<template>
  <div class="introduce-form">
    <div class="user-name-container">
      <span class="username">Hello, <template v-if="userIntroduced">{{ username }}!</template><template v-else>...</template></span>
    </div>

    <Modal title="Log in to start playing" class="user-login-container">
      <template #footer>
        <button type="button" class="btn btn-default" v-on:click="gotoLoginPage">Login</button>
        <button type="button" class="btn btn-default" v-on:click="gotoRegisterPage">Register</button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "./Modal";

  export default {
    components: {Modal},
    data() {
      let name = this.loadUserName();

      return {
        userIntroduced: drupalSettings.user.uid > 0,
        username: name,
      };
    },
    methods: {
      loadUserName: function() {
        let name = drupalSettings.username;
        if(!this.isName(name)) {
          this.$emit('show-modal');
        }
        localStorage.twelveUserName = name;
        return name;
      },

      isName: function(name) {
        return typeof name === "string" && name.length > 0;
      },

      showModal: function () {
        this.userIntroduced = false;
        this.$emit('show-modal');
      },

      gotoLoginPage: function() {
        window.location = window.location.origin + '/user/login?destination=' + encodeURIComponent(window.location.pathname);
      },

      gotoRegisterPage: function() {
        window.location = window.location.origin + '/user/register?destination=' + encodeURIComponent(window.location.pathname);
      },
    }
  };
</script>
