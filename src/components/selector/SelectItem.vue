<script setup>
import { ref } from "vue";

const props = defineProps({
    pokemon: Object,
});

const items = [
    'choice band',
    'choice specs',
    'choice scarf',
    'life orb',
    'leftovers',
]
</script>

<template>
    <select v-model="props.pokemon.pokemon.item">
        <option v-for="(item, index) in items" :key="index" :value="item">
            {{ item }}
        </option>
    </select>
</template>
