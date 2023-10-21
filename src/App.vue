<script setup>
import { onMounted, provide, ref } from 'vue'
import MyPokemon from './components/MyPokemon.vue'
import FourMoves from './components/FourMoves.vue'
import DamageCalculation from './components/DamageCalculation.vue'
import { useMyPokemonsStore } from './store/myPokemons'
import { useEnemyPokemonsStore } from './store/enemyPokemons'
import { storeToRefs } from 'pinia'

//DB代わり
const myPokemonsStore = useMyPokemonsStore()
const { myPokemons } = storeToRefs(myPokemonsStore)
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
  { id: 8, label: "つっぱり", type: "かくとう", power: 15, accuracy: 100, pp: 20 },
  { id: 9, label: "かえんほうしゃ", type: "ほのお", power: 90, accuracy: 100, pp: 15 },
  { id: 10, label: "フレアドライブ", type: "ほのお", power: 120, accuracy: 100, pp: 15 },
]
provide('allMoves', allMoves)

const myPokemonId = ref(0);

</script>

<template>
  <MyPokemon :pokemon="myPokemons[myPokemonId]">
    <FourMoves :pokemon="myPokemons[myPokemonId]" />
  </MyPokemon>
  <h2>VS</h2>
  <template v-for="enemyPokemon in enemyPokemons">
    <MyPokemon :pokemon="enemyPokemon" :isEnemy="true">
      <FourMoves :pokemon="enemyPokemon" :isEnemy="true" />
      <DamageCalculation :myPokemon="myPokemons[myPokemonId]" :enemyPokemon="enemyPokemon" />
    </MyPokemon>
  </template>
</template>

<style scoped></style>
