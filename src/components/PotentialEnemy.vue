<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import SelectMove from './selector/SelectMove.vue'
import HpBar from './HpBar.vue';
import { useMyPokemonsStore } from '../store/myPokemons'
import { useEnemyPokemonsStore } from '../store/enemyPokemons';
import { storeToRefs } from 'pinia'

const props = defineProps({
    myPokemonId: Number,
    enemyPokemonId: Number,
    enemyPokemon: Object,
})

const myPokemonsStore = useMyPokemonsStore()
const { myPokemons } = storeToRefs(myPokemonsStore)
const enemyPokemonsStore = useEnemyPokemonsStore()
const { updateStatusEnemy, handleChangeMoveEnemy } = enemyPokemonsStore

const allMoves = inject('allMoves')

const iconSrc = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.enemyPokemon.id}.png`
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

const findMove = (id) => {
    return allMoves.find((move) => move.id == id)
}

const myMoves = computed(() => {
    return Object.keys(myPokemons.value[props.myPokemonId].pokemon.moveIds).map((key) => findMove(myPokemons.value[props.myPokemonId].pokemon.moveIds[key]))
})

const enemyMoves = computed(() => {
    return Object.keys(props.enemyPokemon.moveIds).map((key) => findMove(props.enemyPokemon.moveIds[key]))
})

</script>

<template>
    <div class="mypokemon">
        <div class="icon">
            <img :src="iconSrc" :alt="props.enemyPokemon.name">
        </div>
        <div class="details">
            <PokemonStatus :pokemon="props.enemyPokemon" @changeStatus="updateStatusEnemy(enemyPokemonId)" />
            <slot></slot>
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
                        <HpBar :attacker="myPokemons[props.myPokemonId].pokemon" :defender="props.enemyPokemon" :move="move"
                            :attackerStatusRank="statusRank" :defenderStatusRank="enemyStatusRank" />
                    </div>
                </div>
            </div>
            <div>被ダメージ</div>
            <div class="moves">
                <div>
                    <div class="move" v-for="(move, index) in enemyMoves" :key="`enemy-${index}`">
                        <SelectMove :selectedMoveId="props.enemyPokemon.moveIds[`slot${index + 1}`]"
                            @changeMove="(newMove) => handleChangeMoveEnemy(newMove, index + 1, props.enemyPokemonId)" />
                        <div>
                            <span>{{ move.type }}</span>
                            <span>威力: {{ move.power }}</span>
                        </div>
                        <HpBar :attacker="props.enemyPokemon" :defender="myPokemons[props.myPokemonId].pokemon" :move="move"
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