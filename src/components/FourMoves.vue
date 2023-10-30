<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import SelectMove from './selector/SelectMove.vue'
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'
import TypeTranslate from '../translate/TypeTranslate'

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
    return move.bp
}
const getMoveCategory = (moveName) => {
    const move = new Move(gen, moveName)
    return move.category
}
</script>

<template>
    <div class="flex">
        <div>わざ</div>
        <div>
            <div class="flex" v-for="(move, key, index) in props.pokemon.pokemon.moves" :key="index">
                <div class="w-11 border rounded-md text-xxs text-center mx-2 my-0.5 py-0.5">{{ getMoveType(move) }}</div>
                <SelectMove :pokemon="props.pokemon" :slot="key" />
                <div>
                    <span class="mx-2">威力 {{ getMovePower(move) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>