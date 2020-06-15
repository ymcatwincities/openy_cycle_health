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
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat cursus nisl, et elementum arcu pellentesque ut. Curabitur elementum, arcu ac semper porttitor, urna eros condimentum massa, et accumsan massa neque id diam. Morbi aliquam dignissim molestie. Aliquam varius eget ligula vitae eleifend. Etiam eget dolor non justo malesuada tristique. Aliquam dictum diam eu tempus pharetra. Nulla massa tellus, lobortis non porta id, egestas vel tellus.

          Integer quam massa, sodales volutpat cursus ac, convallis id sem. Nulla lobortis ligula enim, nec pulvinar metus mattis ac. Nulla sed maximus erat. Aliquam sit amet tortor sed justo hendrerit ultricies. Phasellus magna enim, cursus non sollicitudin euismod, bibendum eu nibh. Nam tortor eros, vehicula ut turpis eu, rutrum condimentum lectus. Donec convallis mi odio, id porta neque mollis sed.
        </div>
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
