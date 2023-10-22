<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import HpBar from './HpBar.vue';
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'

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

const gen = Generations.get(5)
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
    <div>ランク補正</div>
    <div>
        <span>自分</span>
        <span>A</span>
        <input type="number" min="-6" max="6" v-model="statusRank.atk">
        <span>B</span>
        <input type="number" min="-6" max="6" v-model="statusRank.def">
        <span>C</span>
        <input type="number" min="-6" max="6" v-model="statusRank.spa">
        <span>D</span>
        <input type="number" min="-6" max="6" v-model="statusRank.spd">
        <span>S</span>
        <input type="number" min="-6" max="6" v-model="statusRank.spe">
    </div>
    <div>
        <span>相手</span>
        <span>A</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.atk">
        <span>B</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.def">
        <span>C</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.spa">
        <span>D</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.spd">
        <span>S</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.spe">
    </div>
    <div>与ダメージ</div>
    <div class="moves">
        <div class="move4">
            <div class="move" v-for="(move, index) in props.myPokemon.pokemon.moves" :key="index">
                <div class="type">{{ getMoveType(move) }}</div>
                <span>{{ move }}</span>
                <span>威力: {{ getMovePower(move) }}</span>
            </div>
        </div>
        <div>
            <div class="move" v-for="(move, index) in props.myPokemon.pokemon.moves" :key="index">
                <HpBar :attacker="props.myPokemon" :defender="props.enemyPokemon" :move="move" :attackerBoost="statusRank"
                    :defenderBoost="enemyStatusRank" />
            </div>
        </div>
    </div>
    <div>被ダメージ</div>
    <div class="moves">
        <div class="move4">
            <div class="move" v-for="(move, index) in props.enemyPokemon.pokemon.moves" :key="index">
                <div class="type">{{ getMoveType(move) }}</div>
                <span>{{ move }}</span>
                <span>威力: {{ getMovePower(move) }}</span>
            </div>
        </div>
        <div>
            <div class="move" v-for="(move, index) in props.enemyPokemon.pokemon.moves" :key="index">
                <HpBar :attacker="props.enemyPokemon" :defender="props.myPokemon" :move="move"
                    :attackerBoost="enemyStatusRank" :defenderBoost="statusRank" />
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

.move4 {
    margin: 0 20px 0 0;
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