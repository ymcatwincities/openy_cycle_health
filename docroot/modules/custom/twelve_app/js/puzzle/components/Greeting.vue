<template>
  <div class="introduce-form">
    <div class="user-name-container">
      <span class="username">Hello, {{ userIntroduced ? username : '...' }}</span>
    </div>

    <Modal title="Log in to start playing" class="user-login-container"
      v-if="!userIntroduced"
    >
      <template #footer>
        <button type="button" class="btn btn-default" v-on:click="gotoLoginPage">Login</button>
        <button type="button" class="btn btn-default" v-on:click="gotoRegisterPage">Register</button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "./Modal";
  import twelve from "../../app/twelve";

  export default {
    components: {Modal},
    props: {
      username: {
        type: String,
        default: ''
      },
      canEdit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      gotoLoginPage: function() {
        window.location = window.location.origin + '/user/login?destination=' + encodeURIComponent(window.location.pathname);
      },

      gotoRegisterPage: function() {
        window.location = window.location.origin + '/user/register?destination=' + encodeURIComponent(window.location.pathname);
      },
    },
    computed: {
      userIntroduced: function() {
        return twelve.user.validate_name(this.$props.username);
      }
    }
  };
</script>
