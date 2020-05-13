<template>
  <Modal :close_handler="closeModal"
    v-bind:class="['badge', type]"
    v-if="badgeModalVisible"
  >
    <template #body>
      <div class="badge-image"></div>
      <div v-if="text">{{ text }}</div>
    </template>
    <template #footer>
      <button type="button" class="btn btn-default"
        v-on:click="buttonHandler"
        v-if="buttonText"
      >{{ buttonText }}</button>
    </template>
  </Modal>
</template>

<script>
  import Modal from "./Modal.vue";

  export default {
    props: {
      badgeModalVisible: Boolean,
      type: String,
      buttonText: String,
      gotoUrl: String,
      text: String
    },
    components: {
      Modal,
    },
    data: function () {
      return {
      };
    },
    methods: {
      buttonHandler: function() {
        if (this.$props.gotoUrl.length > 0) {
          window.location = window.location.origin + this.$props.gotoUrl;
        }
        this.closeModal();
      },
      closeModal: function() {
        this.$emit('hide-badge-modal');
      },
    },
  }
</script>


