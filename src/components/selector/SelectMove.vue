<script setup>

const props = defineProps({
    pokemon: Object,
    slot: String,
})

const moves = [
    'tackle',
    'tail whip',
    'water gun',
    'focus blast',
    'earthquake',
    'dragon claw',
    'fire blast',
    'stone edge',
]

</script>

<template>
    <div>
        <select v-model="props.pokemon.pokemon.moves[props.slot]">
            <option v-for="(move, index) in moves" :key="index" :value="move">
                {{ move }}
            </option>
        </select>
    </div>
</template>
