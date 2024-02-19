<script setup>
import { ref, watch } from 'vue'
import { Generations, Pokemon } from '@smogon/calc'

const props = defineProps({
    pokemon: Object,
});

const gen = Generations.get(9)
const abilities = ref(null)

watch(() => props.pokemon.name, () => {
    const pokemon = new Pokemon(gen, props.pokemon.name, {
        level: props.pokemon.level,
    })
    abilities.value = pokemon.species.abilities
}, { immediate: true })

</script>

<template>
    <select v-model="props.pokemon.abilityId">
        <option value="" disabled>特性</option>
        <option v-for="(value, key, index) in abilities" :key="key" :value="key">
            {{ value }}
        </option>
    </select>
</template>
