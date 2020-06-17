<template>
  <Modal
    v-if="isGuest"
    :title="'Log in to start playing'"
    :show_close_button="false"
  >
    <template #footer>
      <button type="button" class="btn btn-default" v-on:click="gotoLoginPage">Login</button>
      <button type="button" class="btn btn-default" v-on:click="gotoRegisterPage">Register</button>
    </template>
  </Modal>
</template>
<script>
  import Modal from "../../components/Modal";
  import twelve from "../../helper/twelve";

  export default {
    components: { Modal },
    computed: {
      isGuest() {
        return twelve.user.is_guest();
      },
    },
    methods: {
      gotoLoginPage: function() {
        window.location = window.location.origin + '/user/login?destination=' + encodeURIComponent(window.location.pathname);
      },

      gotoRegisterPage: function() {
        window.location = window.location.origin + '/user/register?destination=' + encodeURIComponent(window.location.pathname);
      },
    },
  }
</script>
