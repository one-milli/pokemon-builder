<script setup>
import { ref, watch } from 'vue'
import PokemonMoveTranslate from '../../translate/PokemonMoveTranslate'

const props = defineProps({
    pokemon: Object,
    slot: String,
})

const moves = ref(null)

watch(() => props.pokemon.pokemon.name, async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + props.pokemon.pokemon.name)
    const result = await response.json()
    moves.value = result.moves
}, { immediate: true })

</script>

<template>
    <div class="mx-1">
        <select v-model="props.pokemon.pokemon.moves[props.slot]">
            <option v-for="(move, index) in moves" :key="index" :value="move.move.name">
                {{ PokemonMoveTranslate[move.move.name] }}
            </option>
        </select>
    </div>
</template>
