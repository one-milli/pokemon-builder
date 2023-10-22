<script setup>
import { ref } from "vue";

const props = defineProps({
    pokemon: Object,
});

const items = ref([
    'Choice Band',
    'Choice Specs',
    'Choice Scarf',
    'Life Orb',
    'Leftovers',
])

</script>

<template>
    <select v-model="props.pokemon.pokemon.item">
        <option v-for="(item, index) in items" :key="index" :value="item">
            {{ item }}
        </option>
    </select>
</template>
