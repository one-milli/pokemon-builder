<script setup>
import { onMounted, provide, ref } from 'vue'
import MyPokemon from './components/MyPokemon.vue'
import PotentialEnemy from './components/PotentialEnemy.vue'
import { useEnemyPokemonsStore } from './store/enemyPokemons'
import { storeToRefs } from 'pinia'

//DB代わり
const enemyPokemonsStore = useEnemyPokemonsStore()
const { enemyPokemons } = storeToRefs(enemyPokemonsStore)

const allMoves = [
  { id: 1, label: "じしん", type: "じめん", power: 100, accuracy: 100, pp: 10 },
  { id: 2, label: "げきりん", type: "ドラゴン", power: 120, accuracy: 100, pp: 5 },
  { id: 3, label: "アイアンヘッド", type: "はがね", power: 80, accuracy: 100, pp: 15 },
  { id: 4, label: "スケイルショット", type: "ドラゴン", power: 25, accuracy: 100, pp: 15 },
  { id: 5, label: "かみくだく", type: "あく", power: 80, accuracy: 100, pp: 15 },
  { id: 6, label: "きりさく", type: "ノーマル", power: 80, accuracy: 100, pp: 15 },
  { id: 7, label: "ムーンフォース", type: "フェアリー", power: 90, accuracy: 100, pp: 15 },
]
provide('allMoves', allMoves)

const myPokemonId = ref(0);
</script>

<template>
  <MyPokemon :id="myPokemonId" />
  <h2>VS</h2>
  <template v-for="enemyPokemon in enemyPokemons">
    <PotentialEnemy :myPokemonId="myPokemonId" :enemyPokemon="enemyPokemon.pokemon" />
  </template>
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
