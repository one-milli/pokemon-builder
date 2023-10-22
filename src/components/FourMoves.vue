<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import SelectMove from './selector/SelectMove.vue'
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'

const props = defineProps({
    pokemon: Object,
})

const gen = Generations.get(9)
const getMoveType = (moveName) => {
    const move = new Move(gen, moveName)
    return move.type
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
    <div class="moves">
        <div>わざ</div>
        <div>
            <div class="move" v-for="(move, key, index) in props.pokemon.pokemon.moves" :key="index">
                <div class="type">{{ getMoveType(move) }}</div>
                <SelectMove :pokemon="props.pokemon" :slot="key" />
                <div>
                    <span>威力 {{ getMovePower(move) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div {
    text-align: left;
}

span {
    margin: 0 5px;
}

.moves {
    display: flex;
    flex-direction: row;
}

.move {
    display: flex;
}

.type {
    width: 40px;
    border: solid 1px;
    border-radius: 5px;
    font-size: 0.6em;
    text-align: center;
    padding: 2px;
    margin: 3px 8px;
}
</style>