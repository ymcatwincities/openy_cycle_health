<template>
  <Modal :close_handler="closeModal"
         class=""
    v-if="badgeModalVisible"
  >
    <template #body>
      badge body
    </template>
    <template #footer>
      badge footer
    </template>
  </Modal>
</template>

<script>
  import Modal from "./Modal.vue";

  export default {
    props: {
      badgeModalVisible: Boolean,
      class: String
    },
    components: {
      Modal,
    },
    data: function () {
      return {
      };
    },
    methods: {
      closeModal: function() {
        this.$emit('hide-badge-modal');
      },
    },
  }
</script>


