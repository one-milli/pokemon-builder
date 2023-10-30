<script setup>
import { computed, onMounted, ref } from 'vue'
import HpBar from './HpBar.vue';
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'
import TypeTranslate from '../translate/TypeTranslate'

const props = defineProps({
    myPokemon: Object,
    enemyPokemon: Object,
})

const statusRank = ref({
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
})
const enemyStatusRank = ref({
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
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
    <div>ランク補正</div>
    <span>
        <span class="mx-1">自分</span>
        <span class="mx-1">A</span>
        <input type="number" min="-6" max="6" v-model="statusRank.atk" class="w-8">
        <span class="mx-1">B</span>
        <input type="number" min="-6" max="6" v-model="statusRank.def" class="w-8">
        <span class="mx-1">C</span>
        <input type="number" min="-6" max="6" v-model="statusRank.spa" class="w-8">
        <span class="mx-1">D</span>
        <input type="number" min="-6" max="6" v-model="statusRank.spd" class="w-8">
        <span class="mx-1">S</span>
        <input type="number" min="-6" max="6" v-model="statusRank.spe" class="w-8">
    </span>
    <span>
        <span class="mx-1">相手</span>
        <span class="mx-1">A</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.atk" class="w-8">
        <span class="mx-1">B</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.def" class="w-8">
        <span class="mx-1">C</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.spa" class="w-8">
        <span class="mx-1">D</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.spd" class="w-8">
        <span class="mx-1">S</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.spe" class="w-8">
    </span>
    <div>与ダメージ</div>
    <div class="flex">
        <div>
            <div class="flex" v-for="(move, index) in props.myPokemon.pokemon.moves" :key="index">
                <div class="w-11 border rounded-md text-xxs text-center mx-2 my-0.5 py-0.5">{{ getMoveType(move) }}</div>
                <span class="w-32">{{ move }}</span>
                <span class="w-20">威力: {{ getMovePower(move) }}</span>
            </div>
        </div>
        <div>
            <div class="flex" v-for="(move, index) in props.myPokemon.pokemon.moves" :key="index">
                <HpBar :attacker="props.myPokemon" :defender="props.enemyPokemon" :move="move" :attackerBoost="statusRank"
                    :defenderBoost="enemyStatusRank" />
            </div>
        </div>
    </div>
    <div>被ダメージ</div>
    <div class="flex">
        <div>
            <div class="flex" v-for="(move, index) in props.enemyPokemon.pokemon.moves" :key="index">
                <div class="w-11 border rounded-md text-xxs text-center mx-2 my-0.5 py-0.5">{{ getMoveType(move) }}</div>
                <span class="w-32">{{ move }}</span>
                <span class="w-20">威力: {{ getMovePower(move) }}</span>
            </div>
        </div>
        <div>
            <div class="flex" v-for="(move, index) in props.enemyPokemon.pokemon.moves" :key="index">
                <HpBar :attacker="props.enemyPokemon" :defender="props.myPokemon" :move="move"
                    :attackerBoost="enemyStatusRank" :defenderBoost="statusRank" />
            </div>
        </div>
    </div>
</template>