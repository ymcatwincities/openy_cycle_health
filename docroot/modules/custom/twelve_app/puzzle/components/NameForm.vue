<template>
  <div class="introduce-form">

    <div class="user-name-container">
      <span class="username">Hello, <template v-if="userIntroduced">{{ username }}!</template><template v-else>...</template></span>
      <a class="change-button" v-on:click="showModal">Edit Name</a>
    </div>

    <div class="modal fade show d-block user-login-container" v-if="!userIntroduced">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Log in to start playing</h4>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" v-on:click="gotoLoginPage">Login</button>
            <button type="button" class="btn btn-default" v-on:click="gotoRegisterPage">Register</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      let name = this.loadUserName();

      return {
        userIntroduced: drupalSettings.user.uid > 0,
        username: name,
      };
    },
    created() {

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
