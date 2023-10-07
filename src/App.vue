<script setup>
import MyPokemon from './components/MyPokemon.vue';
import PotentialEnemy from './components/PotentialEnemy.vue';
</script>

<template>
  <MyPokemon />
  <h2>VS</h2>
  <PotentialEnemy />
  <PotentialEnemy />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
