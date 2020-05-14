<template>
  <div
    v-if="debug"
  >
    {{ error_message }}

    <button type="button" class="btn btn-blue mt-3"
            @click="debugShowBadgeModal"
    >debug: show badge
    </button>
  </div>
</template>

<script>
  export default {
    props: ['debug', 'error_message', 'debugShowBadgeModal']
  }
</script>
