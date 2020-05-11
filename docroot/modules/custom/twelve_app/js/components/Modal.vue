<template>
  <div class="modal fade show d-block">
    <div class="modal-backdrop fade in"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="close notranslate" aria-label="Close"
                  v-on:click="close_handler"
          ><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      show_close_button: {
        type: Boolean,
        default: true
      },
      close_handler: {
        type: Function,
        default: function() {}
      }
    }
  }
</script>
