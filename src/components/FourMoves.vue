<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import SelectMove from './selector/SelectMove.vue'
import { useMyPokemonsStore } from '../store/myPokemons'
import { useEnemyPokemonsStore } from '../store/enemyPokemons';

const props = defineProps({
    pokemon: Object,
    isEnemy: Boolean,
})
const myPokemonsStore = useMyPokemonsStore()
const enemyPokemonsStore = useEnemyPokemonsStore()
const store = props.isEnemy ? enemyPokemonsStore : myPokemonsStore
const { handleChangeMove } = store

const allMoves = inject('allMoves')

const findMove = (id) => {
    return allMoves.find((move) => move.id == id)
}
const myMoves = computed(() => {
    return Object.keys(props.pokemon.pokemon.moveIds).map((key) => findMove(props.pokemon.pokemon.moveIds[key]))
})
</script>

<template>
    <div class="moves">
        <div>わざ</div>
        <div>
            <div class="move" v-for="(move, index) in myMoves" :key="index">
                <div class="type">{{ move.type }}</div>
                <SelectMove :allMoves="allMoves" :selectedMoveId="props.pokemon.pokemon.moveIds[`slot${index + 1}`]"
                    @changeMove="(newMove) => handleChangeMove(newMove, index + 1, props.pokemon.id)" />
                <div>
                    <span>威力 {{ move.power }}</span>
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