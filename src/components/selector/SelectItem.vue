<script setup>
import { ref } from "vue";

const props = defineProps({
    pokemon: Object,
});

const items = ref([
    { en: 'Choice Band', ja: 'こだわりハチマキ' },
    { en: 'Choice Specs', ja: 'こだわりメガネ' },
    { en: 'Choice Scarf', ja: 'こだわりスカーフ' },
    { en: 'Life Orb', ja: 'いのちのたま' },
    { en: 'Leftovers', ja: 'たべのこし' },
    { en: 'Eviolite', ja: 'しんかのきせき' },
    { en: 'Assault Vest', ja: 'とつげきチョッキ' },
    { en: 'Expert Belt', ja: 'たつじんのおび' },
])

</script>

<template>
    <select v-model="props.pokemon.pokemon.item">
        <option v-for="(item, index) in items" :key="index" :value="item.en">
            {{ item.ja }}
        </option>
    </select>
</template>
