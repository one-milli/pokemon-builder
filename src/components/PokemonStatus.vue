<script setup>
import { computed, ref } from 'vue'
import SelectAbility from './selector/SelectAbility.vue';
import SelectItem from './selector/SelectItem.vue'
import SelectNature from './selector/SelectNature.vue'
import { useMyPokemonsStore } from '../store/myPokemons'
import { useEnemyPokemonsStore } from '../store/enemyPokemons';
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'

const props = defineProps({
    pokemon: Object,
    isEnemy: Boolean,
})

const myPokemonsStore = useMyPokemonsStore()
const enemyPokemonsStore = useEnemyPokemonsStore()
const store = props.isEnemy ? enemyPokemonsStore : myPokemonsStore
const { updateStatus } = store

const status = ref(props.pokemon.pokemon.status)

const evsTotal = computed(() => {
    const stats = Object.values(props.pokemon.pokemon.evs)
    return stats.reduce((sum, val) => sum + val, 0)
})

const handleChangeNature = (newNature) => {
    props.pokemon.pokemon.selectedNature = newNature
    updateStatus(props.pokemon.id)
}
const handleChangeItem = (newItem) => {
    props.pokemon.pokemon.selectedItem = newItem
}
const handleChangeAbility = (newAbility) => {
    props.pokemon.pokemon.selectedAbility = newAbility
}

const emit = defineEmits(['changeStatus'])
const handleChangeStatus = () => {
    emit('changeStatus')
}

const gen = Generations.get(9)
const pokemon = computed(() => {
    return new Pokemon(gen, props.pokemon.pokemon.name, {
        level: props.pokemon.pokemon.level,
        nature: props.pokemon.pokemon.nature,
        evs: props.pokemon.pokemon.evs,
        ivs: props.pokemon.pokemon.ivs,
        item: props.pokemon.pokemon.item,
    })
})
</script>

<template>
    <div class="name">{{ props.pokemon.pokemon.name }}</div>
    <div class="segment">
        <div>
            Lv.<input type="number" min="0" max="100" v-model="props.pokemon.pokemon.level"
                @change="updateStatus(props.pokemon.id)">
        </div>
        <div>性格</div>
        <SelectNature :pokemon="props.pokemon" @changeNature="handleChangeNature" />
        <div>特性</div>
        <SelectAbility :pokemon="props.pokemon" @changeAbility="handleChangeAbility" />
    </div>
    <div class="segment">
        <div>種族値</div>
        <template v-for="(stat, index) in status" :key="index">
            <span>{{ stat.label }} :</span>
            <span>{{ stat.base }}</span>
        </template>
    </div>
    <div class="segment">
        <div>実数値</div>
        <span>H :</span><span>{{ pokemon.rawStats.hp }}</span>
        <span>A :</span><span>{{ pokemon.rawStats.atk }}</span>
        <span>B :</span><span>{{ pokemon.rawStats.def }}</span>
        <span>C :</span><span>{{ pokemon.rawStats.spa }}</span>
        <span>D :</span><span>{{ pokemon.rawStats.spd }}</span>
        <span>S :</span><span>{{ pokemon.rawStats.spe }}</span>
    </div>
    <div class="segment">
        <div>努力値</div>
        <span>H</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.hp" @change="handleChangeStatus">
        <span>A</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.atk"
            @change="handleChangeStatus">
        <span>B</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.def"
            @change="handleChangeStatus">
        <span>C</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.spa"
            @change="handleChangeStatus">
        <span>D</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.spd"
            @change="handleChangeStatus">
        <span>S</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.spe"
            @change="handleChangeStatus">
        <template v-for="(stat, index) in status" :key="index">
            <span>{{ stat.label }}</span>
            <input type="number" min="0" max="252" step="4" v-model="stat.ev" @change="handleChangeStatus">
        </template>
        <span class="totalEv">合計{{ evsTotal }}</span>
        <span class="remainEv">余り{{ 510 - evsTotal }}</span>
    </div>
    <div>
        <div>もちもの</div>
        <SelectItem :pokemon="props.pokemon" />
    </div>
</template>

<style scoped>
div {
    text-align: left;
}

span {
    margin: 0 5px;
}

.pokemon {
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

.segment * {
    display: inline-block;
}

.details input {
    width: 4em;
}

.name {
    font-size: 1.5em;
    font-weight: bold;
}

.totalEv,
.remainEv {
    width: 60px;
}

.moves {
    display: flex;
    flex-direction: row;
}

.move {
    display: flex;
}
</style>