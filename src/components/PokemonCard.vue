<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import PolyGraph from './PolyGraph.vue'
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'

const props = defineProps({
    pokemon: Object,
})

const iconSrc = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.pokemon.pid}.png`
})

const gen = Generations.get(9)
const pokemon = computed(() => {
    return new Pokemon(gen, props.pokemon.pokemon.name, {
        level: props.pokemon.pokemon.level,
        nature: props.pokemon.pokemon.nature,
        evs: props.pokemon.pokemon.evs,
        ivs: props.pokemon.pokemon.ivs,
        item: props.pokemon.pokemon.item,
    })
})
</script>

<template>
    <div class="flex justify-between border-2 rounded-xl p-4 text-left w-2/3 mx-auto my-6">
        <div class="flex justify-start m-2 w-full">
            <div class="m-2">
                <img :src="iconSrc" :alt="props.pokemon.pokemon.name" class="w-36">
            </div>
            <div>
                <PokemonStatus :pokemon="props.pokemon" />
                <slot></slot>
            </div>
        </div>
        <div class="w-64">
            <svg width="250" height="270" class="mt-2">
                <PolyGraph :values="pokemon.rawStats" :className="'rv'" />
                <PolyGraph :values="props.pokemon.pokemon.evs" :className="'ev'" />
            </svg>
        </div>
    </div>
</template>
