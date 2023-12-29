<script setup>
import { ref } from 'vue'
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
</script>

<template>
  <div class="mx-auto">
    <MainHeader />
    <div class="h-4 m-6"></div>
    <PokemonCard :pokemon="myPokemons[myPokemonId]" :deletable="false">
      <FourMoves :pokemon="myPokemons[myPokemonId]" />
    </PokemonCard>
    <div class="flex items-center justify-center h-12 mb-6">
      <div class="text-2xl font-bold">VS</div>
    </div>
    <template v-for="enemyPokemon in enemyPokemons">
      <PokemonCard :pokemon="enemyPokemon" :deletable="true">
        <FourMoves :pokemon="enemyPokemon" />
        <DamageCalculation :myPokemon="myPokemons[myPokemonId]" :enemyPokemon="enemyPokemon" />
      </PokemonCard>
    </template>
    <AddForm />
  </div>
</template>
