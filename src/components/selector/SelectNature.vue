<script setup>
import { ref } from 'vue'

const props = defineProps({
    pokemon: Object
})

const natures = ref([
    'lonely',
    'adamant',
    'naughty',
    'brave',
    'bold',
    'impish',
    'lax',
    'relaxed',
    'modest',
    'mild',
    'rash',
    'quiet',
    'calm',
    'gentle',
    'careful',
    'sassy',
    'timid',
    'hasty',
    'jolly',
    'naive',
    'serious',
])

const emit = defineEmits()
const handleChangeNature = () => {
    emit('changeNature')
}
</script>

<template>
    <select v-model="props.pokemon.pokemon.nature" @change="handleChangeNature">
        <option v-for="(nature, index) in natures" :key="index" :value="nature">
            {{ nature }}
        </option>
    </select>
</template>
