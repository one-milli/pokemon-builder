<script setup>
import { onMounted, provide, ref } from 'vue'
import MyPokemon from './components/MyPokemon.vue'
import PotentialEnemy from './components/PotentialEnemy.vue'
import FourMoves from './components/FourMoves.vue'
import DamageCalculation from './components/DamageCalculation.vue'
import { useMyPokemonsStore } from './store/myPokemons'
import { useEnemyPokemonsStore } from './store/enemyPokemons'
import { storeToRefs } from 'pinia'

//DB代わり
const myPokemonsStore = useMyPokemonsStore()
const { myPokemons } = storeToRefs(myPokemonsStore)
const { updateStatus } = myPokemonsStore
const enemyPokemonsStore = useEnemyPokemonsStore()
const { enemyPokemons } = storeToRefs(enemyPokemonsStore)
const { updateStatusEnemy } = enemyPokemonsStore

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
console.log(enemyPokemons.value)

onMounted(() => {
  updateStatus(myPokemonId.value)
  enemyPokemons.value.forEach(e => {
    updateStatusEnemy(e.enemyId)
  });
})
</script>

<template>
  <MyPokemon :pokemon="myPokemons[myPokemonId]">
    <FourMoves :pokemon="myPokemons[myPokemonId]" />
  </MyPokemon>
  <h2>VS</h2>
  <template v-for="enemyPokemon in enemyPokemons">
    <PotentialEnemy :pokemon="enemyPokemon">
      <FourMoves :pokemon="enemyPokemon" />
      <DamageCalculation :myPokemon="myPokemons[myPokemonId]" :enemyPokemon="enemyPokemon" />
    </PotentialEnemy>
  </template>
</template>

<style scoped></style>
