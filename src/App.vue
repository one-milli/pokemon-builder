<script setup>
import MyPokemon from './components/MyPokemon.vue';
import PotentialEnemy from './components/PotentialEnemy.vue';

const allMoves = [
  { id: 1, label: "じしん", type: "じめん", power: 100, accuracy: 100, pp: 10 },
  { id: 2, label: "げきりん", type: "ドラゴン", power: 120, accuracy: 100, pp: 5 },
  { id: 3, label: "アイアンヘッド", type: "はがね", power: 80, accuracy: 100, pp: 15 },
  { id: 4, label: "スケイルショット", type: "ドラゴン", power: 25, accuracy: 100, pp: 15 },
  { id: 5, label: "かみくだく", type: "あく", power: 80, accuracy: 100, pp: 15 },
  { id: 6, label: "きりさく", type: "ノーマル", power: 80, accuracy: 100, pp: 15 },
  { id: 7, label: "ムーンフォース", type: "フェアリー", power: 90, accuracy: 100, pp: 15 },
]
</script>

<template>
  <MyPokemon :allMoves="allMoves" />
  <h2>VS</h2>
  <PotentialEnemy :allMoves="allMoves" />
  <PotentialEnemy :allMoves="allMoves" />
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
