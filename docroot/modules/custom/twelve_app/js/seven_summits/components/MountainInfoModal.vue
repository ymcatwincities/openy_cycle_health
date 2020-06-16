<template>
  <Modal
    :close_handler="hideMountainInfoModal"
    :title="mountain.mountain"
    class="mountain-info-modal"
    v-if="modal"
  >
    <template #body>
      <div>
        <div class="info">
          <span>
            <span>Continent</span> <span>{{ mountain.continent }}</span>
          </span>
          <span>
            <span>Country</span> <span>{{ mountain.country }}</span>
          </span>
          <span>
            <span>Range</span> <span>{{ mountain.range }}</span>
          </span>
          <span>
            <span>Elevation</span> <span>{{ mountain.elevation }}</span>
          </span>
        </div>
        <div class="description" v-html="mountain.description"></div>
        <div class="links">
          <p>Mountain Information</p>
          <p>Image Gallery</p>
        </div>
      </div>
      <div>
        <div class="image"></div>
        <div class="preview">
          <div></div>
        </div>
      </div>
    </template>
    <template #footer>
      <p>{{ getProgress(mountain) }} complete</p>
      <p>start climbing</p>
      <p>1 summit / 0 finishes</p>
    </template>
  </Modal>
</template>

<script>
  import Modal from '../../components/Modal';
  import { mapMutations, mapState, mapActions } from 'vuex';
  import MountainMixin from "../mixins/Mountain";

  export default {
    components: { Modal },
    mixins: [ MountainMixin ],
    created() {
    },
    computed: {
      ...mapState('modalMountainInfo', [
        'modal',
        'mountain'
      ])
    },
    methods: {
      ...mapMutations('modalMountainInfo', {
        hideMountainInfoModal: 'hideModal',
      }),
    }
  }
</script>
