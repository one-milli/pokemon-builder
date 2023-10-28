<script setup>
import { onMounted, provide, computed, ref } from 'vue'
import PokemonCard from './components/PokemonCard.vue'
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

const myPokemonId = ref(0)

const allPokemonCnt = 1292
const allPokemonData = ref(null)

const allMoveCnt = 922
const allMoveData = ref(null)

onMounted(async () => {
  const cachedPokemons = sessionStorage.getItem('allPokemonData')
  const cachedMoves = sessionStorage.getItem('allMoveData')

  if (cachedPokemons) {
    const parsed = JSON.parse(cachedPokemons)
    allPokemonData.value = parsed.results
  } else {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + String(allPokemonCnt))
    const result = await response.json()
    sessionStorage.setItem('allPokemonData', JSON.stringify(result))
    allPokemonData.value = result.results
  }

  if (cachedMoves) {
    const parsed = JSON.parse(cachedMoves)
    allMoveData.value = parsed.results
  } else {
    const response = await fetch('https://pokeapi.co/api/v2/move/?offset=0&limit=' + String(allMoveCnt))
    const result = await response.json()
    sessionStorage.setItem('allMoveData', JSON.stringify(result))
    allMoveData.value = result.results
  }
})
</script>

<template>
  <div class="m-auto">
    <PokemonCard :pokemon="myPokemons[myPokemonId]">
      <FourMoves :pokemon="myPokemons[myPokemonId]" />
    </PokemonCard>
    <div class="text-2xl font-bold">VS</div>
    <template v-for="enemyPokemon in enemyPokemons">
      <PokemonCard :pokemon="enemyPokemon">
        <FourMoves :pokemon="enemyPokemon" />
        <DamageCalculation :myPokemon="myPokemons[myPokemonId]" :enemyPokemon="enemyPokemon" />
      </PokemonCard>
    </template>
  </div>
</template>
