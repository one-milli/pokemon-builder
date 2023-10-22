<script setup>

const props = defineProps({
    pokemon: Object,
})

const moves = [
    'Tackle',
    'Tail Whip',
    'Water Gun',
    'Focus Blast',
]

</script>

<template>
    <div>
        <select v-model="props.pokemon.pokemon.moveIds.slot1">
            <option v-for="(move, index) in moves" :key="index" :value="move">
                {{ move }}
            </option>
        </select>
    </div>
</template>
