<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import SelectMove from './selector/SelectMove.vue'
import { useMyPokemonsStore } from '../store/myPokemons'

const props = defineProps({
    pokemon: Object,
})
const myPokemonsStore = useMyPokemonsStore()
const { handleChangeMove } = myPokemonsStore

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
                <SelectMove :allMoves="allMoves" :selectedMoveId="props.pokemon.pokemon.moveIds[`slot${index + 1}`]"
                    @changeMove="(newMove) => handleChangeMove(newMove, index + 1, props.pokemon.buildId)" />
                <div>
                    <span>{{ move.type }}</span>
                    <span>威力: {{ move.power }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.moves {
    display: flex;
    flex-direction: row;
}

.move {
    display: flex;
}
</style>