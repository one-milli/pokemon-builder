<script setup>
import { onMounted, ref } from 'vue'
import PokemonMoveTranslate from '../../translate/PokemonMoveTranslate'

const props = defineProps({
    pokemon: Object,
    slot: String,
})

const moves = ref(null)

onMounted(async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + props.pokemon.pokemon.name)
    const result = await response.json()
    moves.value = result.moves
})

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
