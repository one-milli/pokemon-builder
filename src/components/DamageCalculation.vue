<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import HpBar from './HpBar.vue';

const props = defineProps({
    myPokemon: Object,
    enemyPokemon: Object,
})

const allMoves = inject('allMoves')

const statusRank = ref({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    S: 0,
})
const enemyStatusRank = ref({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    S: 0,
})

const findMove = (id) => {
    return allMoves.find((move) => move.id == id)
}

const myMoves = computed(() => {
    return Object.keys(props.myPokemon.pokemon.moveIds).map((key) => findMove(props.myPokemon.pokemon.moveIds[key]))
})

const enemyMoves = computed(() => {
    return Object.keys(props.enemyPokemon.pokemon.moveIds).map((key) => findMove(props.enemyPokemon.pokemon.moveIds[key]))
})
</script>

<template>
    <div>ランク補正</div>
    <div>
        <span>自分</span>
        <span>A</span>
        <input type="number" min="-6" max="6" v-model="statusRank.A">
        <span>B</span>
        <input type="number" min="-6" max="6" v-model="statusRank.B">
        <span>C</span>
        <input type="number" min="-6" max="6" v-model="statusRank.C">
        <span>D</span>
        <input type="number" min="-6" max="6" v-model="statusRank.D">
        <span>S</span>
        <input type="number" min="-6" max="6" v-model="statusRank.S">
    </div>
    <div>
        <span>相手</span>
        <span>A</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.A">
        <span>B</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.B">
        <span>C</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.C">
        <span>D</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.D">
        <span>S</span>
        <input type="number" min="-6" max="6" v-model="enemyStatusRank.S">
    </div>
    <div>与ダメージ</div>
    <div class="moves">
        <div class="move4">
            <div class="move" v-for="(move, index) in myMoves" :key="index">
                <div class="type">{{ move.type }}</div>
                <span>{{ move.label }}</span>
                <span>威力: {{ move.power }}</span>
            </div>
        </div>
        <div>
            <div class="move" v-for="(move, index) in myMoves" :key="index">
                <HpBar :attacker="props.myPokemon" :defender="props.enemyPokemon" :move="move"
                    :attackerStatusRank="statusRank" :defenderStatusRank="enemyStatusRank" />
            </div>
        </div>
    </div>
    <div>被ダメージ</div>
    <div class="moves">
        <div class="move4">
            <div class="move" v-for="(move, index) in enemyMoves" :key="index">
                <div class="type">{{ move.type }}</div>
                <span>{{ move.label }}</span>
                <span>威力: {{ move.power }}</span>
            </div>
        </div>
        <div>
            <div class="move" v-for="(move, index) in enemyMoves" :key="index">
                <HpBar :attacker="props.enemyPokemon" :defender="props.myPokemon" :move="move"
                    :attackerStatusRank="statusRank" :defenderStatusRank="enemyStatusRank" />
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