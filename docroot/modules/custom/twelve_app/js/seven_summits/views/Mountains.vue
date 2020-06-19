<template>

  <div class="views-layout mountains-layout">
    <div class="greetings-block-wrapper">
    <div class="greeting-block">
      <div class="climber-wrapper">
        <Climber :class="['hero', $store.state.jacketColor, $store.state.fleshTone]"></Climber>
      </div>
      <div class="user-name">Hi, {{ username }}</div>
      <div class="edit" v-on:click="editCharacterClick"></div>
    </div>
    </div>
    <Mountain
      v-for="summit in summits"
      :summit="summit"
    ></Mountain>
  </div>
</template>

<script>
  import Mountain from "../components/Mountain";
  import Climber from "../components/Climber";
  import { mapState, mapMutations } from 'vuex';
  import twelve from "../../helper/twelve";

  export default {
    data: function() {
      return {
        username: twelve.user.get_active_player_name(),
      }
    },
    components: {
      Mountain,
      Climber
    },
    computed: {
      ...mapState([
        'summits'
      ]),
    },
    methods: {
      ...mapMutations([
        'updateHeroSelected'
      ]),
      editCharacterClick: function() {
        this.updateHeroSelected();
        this.$router.push({ name: "Hero"});
      }
    }
  }
</script>
