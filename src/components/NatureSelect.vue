<script setup>
import { ref } from 'vue'

const selectedNature = ref({})
const natures = ref([
    { label: "さみしがり", boost: "A", drop: "B" },
    { label: "いじっぱり", boost: "A", drop: "C" },
    { label: "やんちゃ", boost: "A", drop: "D" },
    { label: "ゆうかん", boost: "A", drop: "S" },
    { label: "ずぶとい", boost: "B", drop: "A" },
    { label: "わんぱく", boost: "B", drop: "C" },
    { label: "のうてんき", boost: "B", drop: "D" },
    { label: "のんき", boost: "B", drop: "S" },
    { label: "ひかえめ", boost: "C", drop: "A" },
    { label: "おっとり", boost: "C", drop: "B" },
    { label: "うっかりや", boost: "C", drop: "D" },
    { label: "れいせい", boost: "C", drop: "S" },
    { label: "おだやか", boost: "D", drop: "A" },
    { label: "おとなしい", boost: "D", drop: "B" },
    { label: "しんちょう", boost: "D", drop: "C" },
    { label: "なまいき", boost: "D", drop: "S" },
    { label: "おくびょう", boost: "S", drop: "A" },
    { label: "せっかち", boost: "S", drop: "B" },
    { label: "ようき", boost: "S", drop: "C" },
    { label: "むじゃき", boost: "S", drop: "D" },
    { label: "まじめ", boost: "", drop: "" },
])

</script>

<template>
    <div class="nature-select">
        <select :value="selectedNature" @change="emit('update:selectedNature', $event.target.value)">
            <option v-for="nature in natures" :value="nature">{{ nature.label }}</option>
        </select>
    </div>
</template>