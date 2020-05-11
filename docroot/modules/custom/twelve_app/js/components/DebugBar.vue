  <div class="container">
    <button class="btn btn-blue"
            v-on:click="$emit('short-click')"
    >Short timer
    </button>
  </div>

<script>
  export default {
    props: [
      'debug',
    ],
    components: {},
    data: function () {
      return {};
    },
    created: function () {
    },
    computed: {},
    methods: {},
    watch: {},
    mounted: function () {
    }
  }
</script>
