<template>
  <div class="greetings-block-wrapper">
    <div class="greeting-block">
      <div class="climber-wrapper">
        <Climber :class="['hero', $store.state.jacketColor, $store.state.fleshTone]"></Climber>
      </div>
      <div class="user-name">Hi, {{ username }}</div>
      <div class="edit" v-on:click="editCharacterClick"></div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from "vuex";
  import Climber from "./Climber";
  import twelve from "../../helper/twelve";

  export default {
    components: { Climber },
    computed: {
      username() {
        return twelve.user.get_active_player_name();
      }
    },
    methods: {
      ...mapMutations([
        'updateHeroSelected'
      ]),
      editCharacterClick: function() {
        this.updateHeroSelected();
        this.$router.push({ name: "Hero"});
      }
    },
  }
</script>
