<template>
  <div class="views-layout views-hero">
    <div :class="['hero', $store.state.jacketColor]">
    </div>
    <div class="jacket-title">Jacket color</div>
    <ButtonsList
      class="jacket-colors"
      :buttonsClasses="['green', 'blue', 'lilac', 'red', 'orange']"
      :mutation="'updateJacketColor'"
      :selected="$store.state.jacketColor"
    ></ButtonsList>
    <a @click="$store.dispatch('saveHero')">Save & continue</a>
  </div>
</template>

<script>
  import ButtonsList from "../components/ButtonsList.vue";

  export default {
    components: {
      ButtonsList,
    },
  }
</script>
