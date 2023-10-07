<script setup>
import { ref } from 'vue'

const props = defineProps({
    selectedNature: Object
})

const selectedNature = ref(props.selectedNature)
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

const emit = defineEmits()
const handleChangeNature = () => {
    emit('changeNature', selectedNature.value)
}
</script>

<template>
    <select v-model="selectedNature" @change="handleChangeNature">
        <option v-for="nature in natures" :key="nature.label" :value="nature">{{ nature.label }}</option>
    </select>
</template>
