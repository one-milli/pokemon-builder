<script setup>
import { computed, onMounted, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import SelectMove from './selector/SelectMove.vue'
import HpBar from './HpBar.vue';

const props = defineProps({
    myPokemon: Object,
    enemyPokemon: Object,
    allMoves: Array
})

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
const enemyCalculatedStatus = ref({
    hp: 0,
    atk: 0,
    def: 0,
    spatk: 0,
    spdef: 0,
    spd: 0,
})

const findMove = (id) => {
    return props.allMoves.find((move) => move.id == id)
}

const myMoves = computed(() => {
    return Object.keys(props.myPokemon.moveIds).map((key) => findMove(props.myPokemon.moveIds[key]))
})

const enemyMoves = computed(() => {
    return Object.keys(props.enemyPokemon.enemyMoveIds).map((key) => findMove(props.enemyPokemon.enemyMoveIds[key]))
})

const handleChangeMove = (newMove, slot) => {
    props.enemyPokemon.enemyMoveIds['slot' + slot] = newMove
}
const handleChangeStatus = (newStatus) => {
    enemyCalculatedStatus.value = newStatus
}
</script>

<template>
    <div class="mypokemon">
        <div class="icon">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/488.png" alt="クレセリア">
        </div>
        <div class="details">
            <PokemonStatus :pokemon="props.enemyPokemon" @changeStatus="handleChangeStatus" />
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
                <div>
                    <div class="move" v-for="(move, index) in myMoves" :key="index">
                        <span>{{ move.label }}</span>
                        <span>{{ move.type }}</span>
                        <span>威力: {{ move.power }}</span>
                        <HpBar :attacker="props.myPokemon" :defender="props.enemyPokemon" :move="move"
                            :attackerStatusRank="statusRank" :defenderStatusRank="enemyStatusRank" />
                    </div>
                </div>
            </div>
            <div>被ダメージ</div>
            <div class="moves">
                <div>
                    <div class="move" v-for="(move, index) in enemyMoves" :key="`enemy-${index}`">
                        <SelectMove :allMoves="props.allMoves"
                            :selectedMoveId="props.enemyPokemon.enemyMoveIds[`slot${index + 1}`]"
                            @changeMove="(newMove) => handleChangeMove(newMove, index + 1)" />
                        <div>
                            <span>{{ move.type }}</span>
                            <span>威力: {{ move.power }}</span>
                        </div>
                        <HpBar :attacker="props.enemyPokemon" :defender="props.myPokemon" :move="move"
                            :attackerStatusRank="statusRank" :defenderStatusRank="enemyStatusRank" />
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