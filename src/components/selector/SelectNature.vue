<script setup>
import { ref } from 'vue'

const props = defineProps({
    pokemon: Object
})

const natures = ref([
    { en: 'lonely', ja: 'さみしがり' },
    { en: 'adamant', ja: 'いじっぱり' },
    { en: 'naughty', ja: 'やんちゃ' },
    { en: 'brave', ja: 'ゆうかん' },
    { en: 'bold', ja: 'ずぶとい' },
    { en: 'impish', ja: 'わんぱく' },
    { en: 'lax', ja: 'のうてんき' },
    { en: 'relaxed', ja: 'のんき' },
    { en: 'modest', ja: 'ひかえめ' },
    { en: 'mild', ja: 'おっとり' },
    { en: 'rash', ja: 'うっかりや' },
    { en: 'quiet', ja: 'れいせい' },
    { en: 'calm', ja: 'おだやか' },
    { en: 'gentle', ja: 'おとなしい' },
    { en: 'careful', ja: 'しんちょう' },
    { en: 'sassy', ja: 'なまいき' },
    { en: 'timid', ja: 'おくびょう' },
    { en: 'hasty', ja: 'せっかち' },
    { en: 'jolly', ja: 'ようき' },
    { en: 'naive', ja: 'むじゃき' },
    { en: 'serious', ja: 'まじめ' },
])

</script>

<template>
    <select v-model="props.pokemon.nature">
        <option value="" disabled>性格</option>
        <option v-for="(nature, index) in natures" :key="index" :value="nature.en">
            {{ nature.ja }}
        </option>
    </select>
</template>
