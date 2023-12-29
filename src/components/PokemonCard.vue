<script setup>
import { computed } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import PolyGraph from './PolyGraph.vue'
import DeleteButton from './DeleteButton.vue'
import { Generations, Pokemon } from '@smogon/calc'

const props = defineProps({
    pokemon: Object,
    deletable: Boolean,
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
    <div class="pokemon-card flex justify-between border-2 rounded-xl p-4 text-left w-2/3 mx-auto mb-6 min-w-max">
        <div class="flex justify-start m-2 w-full">
            <div class="w-1/4">
                <img :src="iconSrc" :alt="props.pokemon.pokemon.name" class="w-40">
            </div>
            <div class="w-full">
                <PokemonStatus :pokemon="props.pokemon" />
                <slot></slot>
            </div>
        </div>
        <div class="w-64">
            <svg width="250" height="270" class="mt-2">
                <PolyGraph :values="pokemon.rawStats" :className="'rv'" :nature="props.pokemon.pokemon.nature" />
                <PolyGraph :values="props.pokemon.pokemon.evs" :className="'ev'" :nature="props.pokemon.pokemon.nature" />
            </svg>
        </div>
        <DeleteButton v-if="deletable" :buildId="props.pokemon.id" />
    </div>
</template>

<style scoped>
.pokemon-card {
    min-width: 1153px;
}
</style>