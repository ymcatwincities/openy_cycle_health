<template>
  <Modal
    :close_handler="hideMountainInfoModal"
    :title="mountain.mountain"
    class="mountain-info-modal"
    v-if="modal"
  >
    <template #body>
      <div :class="{ 'w-100': !mountain.images.length }">
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
      <div class="image-gallery" v-if="mountain.images.length > 0">
        <Gallery
          :width = "gallery_width"
          :height = "gallery_height"
          :responsive="gallery_responsive"
          :showControls="gallery_showControls"
          :accentColor="gallery_accentColor"
          :items="mountain.images"
        />
      </div>
    </template>
    <template #footer>
      <p>{{ getProgress(mountain) }}% complete</p>
      <a
        @click="gotoMountain"
        class="start_climbing"
        :class="{disabled: isConquered}"
      >{{ isConquered ? 'The mountain is conquered' : 'Start climbing' }}</a>
      <p>{{ mountain.id }} summit / {{ finishes }} finishes</p>
    </template>
  </Modal>
</template>

<script>
  import Modal from '../../components/Modal';
  import { mapMutations, mapState, mapActions } from 'vuex';
  import MountainMixin from "../mixins/Mountain";
  import Gallery from '../../components/Gallery';
  import router from "../router";

  export default {
    components: { Modal, Gallery },
    mixins: [ MountainMixin ],
    data() {
      return {
        gallery_width: 480,
        gallery_height: 480,
        gallery_responsive: true,
        gallery_showControls: false,
        gallery_accentColor: '#92278f',
        finishes: 0
      }
    },
    created: function() {
      this.finishes = this.$store.state.finishes.length;
    },
    computed: {
      isConquered() {
        return this.getProgress(this.mountain) === 100;
      },

      ...mapState('modalMountainInfo', [
        'modal',
        'mountain'
      ]),
    },
    methods: {
      ...mapMutations('modalMountainInfo', {
        hideMountainInfoModal: 'hideModal',
      }),

      gotoMountain() {
        if (!this.isConquered) {
          router.push({ name: 'Mountain', params: {id: this.mountain.id } })
        }

        this.hideMountainInfoModal();
      },
    }
  }
</script>
