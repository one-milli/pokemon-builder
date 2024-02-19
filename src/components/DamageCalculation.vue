<script setup>
import { ref } from 'vue'
import HpBar from './HpBar.vue';
import { Generations, Move } from '@smogon/calc'
import PokemonMoveTranslate from '../translate/PokemonMoveTranslate'
import TypeTranslate from '../translate/TypeTranslate'
import physical from './icons/physical.vue'
import special from './icons/special.vue'
import status from './icons/status.vue'

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
    if (move.bp === 0) {
        return '-'
    }
    return move.bp || '-'
}
const getMoveCategory = (moveName) => {
    const move = new Move(gen, moveName)
    return move.category
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
        return 'bg-green-500'
    } else if (type === 'Ice') {
        return 'bg-blue-300'
    } else if (type === 'Fighting') {
        return 'bg-red-600'
    } else if (type === 'Poison') {
        return 'bg-purple-800'
    } else if (type === 'Ground') {
        return 'bg-yellow-600'
    } else if (type === 'Flying') {
        return 'bg-blue-400'
    } else if (type === 'Psychic') {
        return 'bg-pink-700'
    } else if (type === 'Bug') {
        return 'bg-green-700'
    } else if (type === 'Rock') {
        return 'bg-yellow-800'
    } else if (type === 'Ghost') {
        return 'bg-purple-600'
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
    <div class="flex mt-4">
        <div class="font-bold mr-1">ランク補正</div>
        <div class="mr-3">
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
        </div>
        <div>
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
        </div>
    </div>
    <div class="font-bold">与ダメージ</div>
    <div class="flex">
        <div>
            <div class="flex" v-for="(move, index) in props.myPokemon.moves" :key="index">
                <div class="icon" v-if="getMoveCategory(move) === 'Physical'">
                    <physical></physical>
                </div>
                <div class="icon" v-if="getMoveCategory(move) === 'Special'">
                    <special></special>
                </div>
                <div class="icon" v-if="getMoveCategory(move) === 'Status'">
                    <status></status>
                </div>
                <div class="w-11 border rounded-md font-extrabold text-xxs text-center mx-1 my-0.5 py-0.5"
                    :class="getTypeColor(move)">{{
                        getMoveType(move) }}</div>
                <span class="w-28">{{ PokemonMoveTranslate[move] }}</span>
                <span class="w-12">{{ '(' + getMovePower(move) + ')' }}</span>
            </div>
        </div>
        <div>
            <div class="flex" v-for="(move, index) in props.myPokemon.moves" :key="index">
                <HpBar :attacker="props.myPokemon" :defender="props.enemyPokemon" :move="move" :attackerBoost="statusRank"
                    :defenderBoost="enemyStatusRank" />
            </div>
        </div>
    </div>
    <div class="font-bold">被ダメージ</div>
    <div class="flex">
        <div>
            <div class="flex" v-for="(move, index) in props.enemyPokemon.moves" :key="index">
                <div class="icon" v-if="getMoveCategory(move) === 'Physical'">
                    <physical></physical>
                </div>
                <div class="icon" v-if="getMoveCategory(move) === 'Special'">
                    <special></special>
                </div>
                <div class="icon" v-if="getMoveCategory(move) === 'Status'">
                    <status></status>
                </div>
                <div class="w-11 border rounded-md font-extrabold text-xxs text-center mx-1 my-0.5 py-0.5"
                    :class="getTypeColor(move)">{{
                        getMoveType(move) }}</div>
                <span class="w-28">{{ PokemonMoveTranslate[move] }}</span>
                <span class="w-12">{{ '(' + getMovePower(move) + ')' }}</span>
            </div>
        </div>
        <div>
            <div class="flex" v-for="(move, index) in props.enemyPokemon.moves" :key="index">
                <HpBar :attacker="props.enemyPokemon" :defender="props.myPokemon" :move="move"
                    :attackerBoost="enemyStatusRank" :defenderBoost="statusRank" />
            </div>
        </div>
    </div>
</template>