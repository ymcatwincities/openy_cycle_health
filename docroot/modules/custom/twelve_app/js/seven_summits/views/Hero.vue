<template>
  <div class="views-layout views-hero">
    <div :class="['hero', $store.state.jacketColor, $store.state.fleshTone]">
      <Climber></Climber>
    </div>
    <div class="jacket-title">Jacket color</div>
    <ButtonsList
      class="jacket-colors"
      :buttonsClasses="['green', 'blue', 'lilac', 'red', 'orange']"
      :mutation="'updateJacketColor'"
      :selected="$store.state.jacketColor"
    ></ButtonsList>
    <div class="flesh-title">Flesh tone</div>
    <ButtonsList
      class="flesh-colors"
      :buttonsClasses="['tone-1', 'tone-2', 'tone-3', 'tone-4', 'tone-5']"
      :mutation="'updateFleshTone'"
      :selected="$store.state.fleshTone"
    ></ButtonsList>
    <a @click="$store.dispatch('saveHero')">Save & continue</a>
  </div>
</template>

<script>
  import ButtonsList from "../components/ButtonsList.vue";
  import Climber from "../components/Climber.vue";

  export default {
    components: {
      ButtonsList,
      Climber
    },
  }
</script>
