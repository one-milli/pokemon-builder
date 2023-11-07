<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import SelectMove from './selector/SelectMove.vue'
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'
import TypeTranslate from '../translate/TypeTranslate'
import MoveCategoryTranslate from '../translate/MoveCategoryTranslate'

const props = defineProps({
    pokemon: Object,
})

const gen = Generations.get(9)
const getMoveType = (moveName) => {
    const move = new Move(gen, moveName)
    return TypeTranslate[move.type]
}
const getMovePower = (moveName) => {
    const move = new Move(gen, moveName)
    if (move.bp === 0) {
        return '-'
    }
    return move.bp
}
const getMoveCategory = (moveName) => {
    const move = new Move(gen, moveName)
    return MoveCategoryTranslate[move.category]
}

const getTypeColor = (moveName) => {
    const move = new Move(gen, moveName)
    const type = move.type
    if (type === 'Normal') {
        return 'bg-gray-400'
    } else if (type === 'Fire') {
        return 'bg-red-500'
    } else if (type === 'Water') {
        return 'bg-blue-400'
    } else if (type === 'Electric') {
        return 'bg-yellow-400'
    } else if (type === 'Grass') {
        return 'bg-green-400'
    } else if (type === 'Ice') {
        return 'bg-blue-200'
    } else if (type === 'Fighting') {
        return 'bg-red-600'
    } else if (type === 'Poison') {
        return 'bg-purple-400'
    } else if (type === 'Ground') {
        return 'bg-yellow-600'
    } else if (type === 'Flying') {
        return 'bg-blue-300'
    } else if (type === 'Psychic') {
        return 'bg-purple-600'
    } else if (type === 'Bug') {
        return 'bg-green-600'
    } else if (type === 'Rock') {
        return 'bg-gray-600'
    } else if (type === 'Ghost') {
        return 'bg-purple-800'
    } else if (type === 'Dragon') {
        return 'bg-indigo-700'
    } else if (type === 'Dark') {
        return 'bg-gray-800'
    } else if (type === 'Steel') {
        return 'bg-gray-500'
    } else if (type === 'Fairy') {
        return 'bg-pink-400'
    } else {
        return 'bg-gray-400'
    }
}
</script>

<template>
    <div>
        <div class="flex" v-for="(move, key, index) in props.pokemon.pokemon.moves" :key="index">
            <div class="w-11 border rounded-md text-xxs text-center mx-1 my-0.5 py-0.5" :class="getTypeColor(move)">{{
                getMoveType(move) }}</div>
            <div class="w-11 border rounded-md text-xxs text-center mx-1 my-0.5 py-0.5">{{ getMoveCategory(move) }}
            </div>
            <SelectMove :pokemon="props.pokemon" :slot="key" />
            <div>
                <span class="mx-2">威力 {{ getMovePower(move) }}</span>
            </div>
        </div>
    </div>
</template>