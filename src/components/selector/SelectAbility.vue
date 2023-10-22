<script setup>
import { ref } from "vue";
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'

const props = defineProps({
    pokemon: Object,
});

const gen = Generations.get(9)
const pokemon = new Pokemon(gen, props.pokemon.pokemon.name, {
    level: props.pokemon.pokemon.level,
    nature: props.pokemon.pokemon.nature,
    evs: props.pokemon.pokemon.evs,
    ivs: props.pokemon.pokemon.ivs,
    item: props.pokemon.pokemon.item,
})

const abilities = pokemon.species.abilities

</script>

<template>
    <select v-model="props.pokemon.pokemon.abilityId">
        <option v-for="(value, key, index) in abilities" :key="key" :value="key">
            {{ value }}
        </option>
    </select>
</template>
