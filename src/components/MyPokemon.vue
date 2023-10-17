<script setup>
import { computed, inject, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import SelectMove from './selector/SelectMove.vue'
import { useMyPokemonsStore } from '../store/myPokemons'
import { storeToRefs } from 'pinia'


const props = defineProps({
    id: Number,
    allMoves: Array
})
const myPokemonsStore = useMyPokemonsStore()
const { myPokemons } = storeToRefs(myPokemonsStore)
const { handleChangeMove } = myPokemonsStore

const allMoves = inject('allMoves')

const iconSrc = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${myPokemons.value[props.id].pokemon.id}.png`
})

const calculatedStatus = ref({
    hp: 0,
    atk: 0,
    def: 0,
    spatk: 0,
    spdef: 0,
    spd: 0,
})

const findMove = (id) => {
    return allMoves.find((move) => move.id == id)
}

const myMoves = computed(() => {
    return Object.keys(myPokemons.value[props.id].pokemon.moveIds).map((key) => findMove(myPokemons.value[props.id].pokemon.moveIds[key]))
})

const handleChangeStatus = (newStatus) => {
    calculatedStatus.value = newStatus
}
</script>

<template>
    <div class="mypokemon">
        <div class="icon">
            <img :src="iconSrc" :alt="myPokemons[props.id].pokemon.name">
        </div>
        <div class="details">
            <PokemonStatus :pokemon="myPokemons[props.id].pokemon" @changeStatus="handleChangeStatus" />
            <div class="moves">
                <div>わざ</div>
                <div>
                    <div class="move" v-for="(move, index) in myMoves" :key="index">
                        <SelectMove :allMoves="allMoves"
                            :selectedMoveId="myPokemons[props.id].pokemon.moveIds[`slot${index + 1}`]"
                            @changeMove="(newMove) => handleChangeMove(newMove, index + 1, props.id)" />
                        <div>
                            <span>{{ move.type }}</span>
                            <span>威力: {{ move.power }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="icon">
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

.mypokemon {
    display: flex;
    flex-direction: row;
    margin: 3em;
    padding: 1em;
    border: solid;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    color: #fff;
    line-height: 50px;
    font-size: 30px;
}

.icon img {
    width: 120px;
    height: 120px;
}

.details input {
    width: 4em;
}

.moves {
    display: flex;
    flex-direction: row;
}

.move {
    display: flex;
}
</style>