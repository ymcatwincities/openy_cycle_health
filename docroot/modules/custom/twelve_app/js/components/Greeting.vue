<template>
  <div class="introduce-form">
    <div class="user-name-container">
      <span class="username">Hello, {{ userIntroduced ? username : '...' }}</span>
      <a v-if="canChangeName" class="change-button" v-on:click="showModal">Edit Name</a>
    </div>

    <Modal class="user-login-container"
      v-if="!userIntroduced || nameModalVisible"
      :title="canChangeName ? 'CHALLENGER NAME'  : 'Log in to start playing'"
      :show_close_button="!loginRequired"
      :close_handler="closeModal"
    >
      <template #body v-if="canChangeName">
        <p>What name do you go by, challenger?</p>
        <div class="label">Name</div>
        <input type="text" name="username" v-model="formUsername" class="username" v-on:keyup.enter="setLogin">
      </template>
      <template #footer>
        <template v-if="canChangeName">
          <button type="button" class="btn btn-default" v-on:click="setLogin">Enter</button>
          <button type="button" class="btn btn-white" v-on:click="setDefaultName">No thanks</button>
        </template>
        <template v-else>
          <button type="button" class="btn btn-default" v-on:click="gotoLoginPage">Login</button>
          <button type="button" class="btn btn-default" v-on:click="gotoRegisterPage">Register</button>
        </template>
      </template>
    </Modal>
  </div>
</template>

<script>
  import Modal from "./Modal.vue";
  import twelve from "../helper/twelve";

  export default {
    components: {Modal},
    props: {
      nameModalVisible: Boolean,
      loginRequired: {
        type: Boolean,
        default: true
      }
    },
    data: function() {
      return {
        username: twelve.user.get_active_player_name(),
        formUsername: twelve.user.get_active_player_name(),
      }
    },
    methods: {
      gotoLoginPage: function() {
        window.location = window.location.origin + '/user/login?destination=' + encodeURIComponent(window.location.pathname);
      },

      gotoRegisterPage: function() {
        window.location = window.location.origin + '/user/register?destination=' + encodeURIComponent(window.location.pathname);
      },

      showModal: function () {
        this.userIntroduced = false;
        this.$emit('show-greeting-modal');
      },

      closeModal: function() {
        this.$emit('hide-greeting-modal');
      },

      setDefaultName: function() {
        this.username = 'Challenger';
        this.setLogin();
      },

      setLogin: function () {
        if (!this.formUsername) {
          e.preventDefault();
          return;
        }
        twelve.local_storage.set_user_name(this.formUsername);
        this.username = this.formUsername;
        this.$emit('hide-greeting-modal');

        this.$notify({
          group: 'twelve_app',
          title: 'You have introduced yourself',
          text: 'Lets start training!'
        });
      }
    },
    computed: {
      userIntroduced: function() {
        return twelve.user.validate_name(this.username);
      },
      canChangeName: function () {
        return twelve.user.is_guest() && !this.$props.loginRequired;
      }
    }
  };
</script>
