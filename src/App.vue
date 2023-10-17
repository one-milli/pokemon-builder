<script setup>
import { provide, ref } from 'vue'
import MyPokemon from './components/MyPokemon.vue'
import PotentialEnemy from './components/PotentialEnemy.vue'
import { useMyPokemonsStore } from './store/myPokemons'
import { useEnemyPokemonsStore } from './store/enemyPokemons'

const myPokemonsStore = useMyPokemonsStore()
const enemyPokemonsStore = useEnemyPokemonsStore()

const allMoves = [
  { id: 1, label: "じしん", type: "じめん", power: 100, accuracy: 100, pp: 10 },
  { id: 2, label: "げきりん", type: "ドラゴン", power: 120, accuracy: 100, pp: 5 },
  { id: 3, label: "アイアンヘッド", type: "はがね", power: 80, accuracy: 100, pp: 15 },
  { id: 4, label: "スケイルショット", type: "ドラゴン", power: 25, accuracy: 100, pp: 15 },
  { id: 5, label: "かみくだく", type: "あく", power: 80, accuracy: 100, pp: 15 },
  { id: 6, label: "きりさく", type: "ノーマル", power: 80, accuracy: 100, pp: 15 },
  { id: 7, label: "ムーンフォース", type: "フェアリー", power: 90, accuracy: 100, pp: 15 },
]

const myPokemon = ref({
  name: "ガブリアス",
  level: 50,
  status: [
    { label: "H", base: 108, ev: 0, iv: 31 },
    { label: "A", base: 130, ev: 0, iv: 31 },
    { label: "B", base: 95, ev: 0, iv: 31 },
    { label: "C", base: 80, ev: 0, iv: 31 },
    { label: "D", base: 85, ev: 0, iv: 31 },
    { label: "S", base: 102, ev: 0, iv: 31 }
  ],
  abilities: [
    { label: "すながくれ", type: 0 },
    { label: "さめはだ", type: 0 },
  ],
  selectedAbility: { label: "さめはだ", type: 0 },
  selectedItem: { label: "いのちのたま", status: ["A", "C"], boost: 1.3, conditionId: 1 },
  selectedNature: { label: "いじっぱり", boost: "A", drop: "C" },
  moveIds: { slot1: 1, slot2: 2, slot3: 3, slot4: 4 }
})

const enemyPokemon = ref({
  name: "クレセリア",
  level: 50,
  status: [
    { label: "H", base: 120, ev: 0, iv: 31 },
    { label: "A", base: 70, ev: 0, iv: 31 },
    { label: "B", base: 110, ev: 0, iv: 31 },
    { label: "C", base: 75, ev: 0, iv: 31 },
    { label: "D", base: 120, ev: 0, iv: 31 },
    { label: "S", base: 85, ev: 0, iv: 31 }
  ],
  abilities: [
    { label: "ふゆう", type: 1 },
  ],
  selectedAbility: { label: "ふゆう", type: 1 },
  selectedItem: { label: "とつげきチョッキ", status: ["D"], boost: 1.5, conditionId: 1 },
  selectedNature: { label: "ずぶとい", boost: "B", drop: "A" },
  enemyMoveIds: { slot1: 7, slot2: 2, slot3: 3, slot4: 4 }
})

provide('allMoves', allMoves)
</script>

<template>
  <MyPokemon :myPokemon="myPokemon" />
  <h2>VS</h2>
  <PotentialEnemy :myPokemon="myPokemon" :enemyPokemon="enemyPokemon" />
  <PotentialEnemy :myPokemon="myPokemon" :enemyPokemon="enemyPokemon" />
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
