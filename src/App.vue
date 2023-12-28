<script setup>
import { onMounted, provide, computed, ref } from 'vue'
import { useMyPokemonsStore } from './store/myPokemons'
import { useEnemyPokemonsStore } from './store/enemyPokemons'
import { storeToRefs } from 'pinia'
import MainHeader from './components/MainHeader.vue'
import PokemonCard from './components/PokemonCard.vue'
import FourMoves from './components/FourMoves.vue'
import DamageCalculation from './components/DamageCalculation.vue'
import AddForm from './components/AddForm.vue'

//DB代わり
const myPokemonsStore = useMyPokemonsStore()
const { myPokemons } = storeToRefs(myPokemonsStore)
const enemyPokemonsStore = useEnemyPokemonsStore()
const { enemyPokemons } = storeToRefs(enemyPokemonsStore)

const myPokemonId = ref(0)

const allPokemonCnt = 1292
const allPokemonData = ref(null)

onMounted(async () => {
  const cachedPokemons = sessionStorage.getItem('allPokemonData')

  if (cachedPokemons) {
    const parsed = JSON.parse(cachedPokemons)
    allPokemonData.value = parsed.results
  } else {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + String(allPokemonCnt))
    const result = await response.json()
    sessionStorage.setItem('allPokemonData', JSON.stringify(result))
    allPokemonData.value = result.results
  }
})
</script>

<template>
  <div class="mx-auto">
    <MainHeader />
    <div class="m-6">&nbsp;</div>
    <PokemonCard :pokemon="myPokemons[myPokemonId]" :deletable="false">
      <FourMoves :pokemon="myPokemons[myPokemonId]" />
    </PokemonCard>
    <div class="text-2xl font-bold">VS</div>
    <template v-for="enemyPokemon in enemyPokemons">
      <PokemonCard :pokemon="enemyPokemon" :deletable="true">
        <FourMoves :pokemon="enemyPokemon" />
        <DamageCalculation :myPokemon="myPokemons[myPokemonId]" :enemyPokemon="enemyPokemon" />
      </PokemonCard>
    </template>
    <AddForm />
  </div>
</template>
