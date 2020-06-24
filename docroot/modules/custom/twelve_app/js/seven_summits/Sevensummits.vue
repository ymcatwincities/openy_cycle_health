<template>
  <div>
    <LoginRequiredModal></LoginRequiredModal>
    <MountainInfoModal></MountainInfoModal>
    <BadgeModal
      :type="$store.state.badge.type"
      :text="$store.state.badge.text"
      :buttonText="$store.state.badge.buttonText"
      :gotoUrl="$store.state.badge.url"
      :badgeModalVisible="$store.state.badge.modal"
      v-on:hide-badge-modal="$store.commit('badge/hideModal')"
    ></BadgeModal>

    <router-view/>
    <notifications group="twelve_app"></notifications>
  </div>
</template>

<script>
  import MountainInfoModal from "./components/MountainInfoModal";
  import LoginRequiredModal from "./components/LoginRequiredModal";
  import BadgeModal from "../components/BadgeModal";

  export default {
    name: 'Sevensummits',
    components: {
      LoginRequiredModal,
      MountainInfoModal,
      BadgeModal
    },
    props: ['debug', 'error_message', 'summits', 'hero_config', 'summits_reached', 'mountains_conquered'],
    data() {
      return {
      };
    },
    created: function () {
      if (this.$props.hero_config.jacketColor !== null) {
        this.$store.state.heroSelected = true;
      }

      this.$store.state.jacketColor = this.$props.hero_config.jacketColor ? this.$props.hero_config.jacketColor : 'green';
      this.$store.state.fleshTone = this.$props.hero_config.fleshTone ? this.$props.hero_config.fleshTone : 'tone-1';
      this.$store.state.summits_reached = this.$props.summits_reached ? this.$props.summits_reached : '0';
      this.$store.state.mountains_conquered = this.$props.mountains_conquered ? this.$props.mountains_conquered : '0';
      this.$store.state.summits = this.$props.summits;
      this.$store.state.debug = this.$props.debug;
    },
  }
</script>
