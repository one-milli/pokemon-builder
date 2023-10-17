<script setup>
import { computed, ref } from 'vue'
import SelectAbility from './selector/SelectAbility.vue';
import SelectItem from './selector/SelectItem.vue'
import SelectNature from './selector/SelectNature.vue'
import { useMyPokemonsStore } from '../store/myPokemons'
import { useEnemyPokemonsStore } from '../store/enemyPokemons';

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
    return status.value.reduce((sum, stat) => sum + stat.ev, 0)
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

const emit = defineEmits()
const handleChangeStatus = () => {
    emit('changeStatus')
}
</script>

<template>
    <div class="name">{{ props.pokemon.pokemon.name }}</div>
    <div class="segment">
        <div>Lv.<input type="number" min="0" max="100" v-model="props.pokemon.pokemon.level"></div>
        <div>性格</div>
        <SelectNature :pokemon="props.pokemon" @changeNature="handleChangeNature" />
        <div>特性</div>
        <SelectAbility :abilities="props.pokemon.pokemon.abilities" :selectedAbility="props.pokemon.pokemon.selectedAbility"
            @changeAbility="handleChangeAbility" />
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
        <span>H :</span><span>{{ props.pokemon.pokemon.status[0].calc }}</span>
        <span>A :</span><span>{{ props.pokemon.pokemon.status[1].calc }}</span>
        <span>B :</span><span>{{ props.pokemon.pokemon.status[2].calc }}</span>
        <span>C :</span><span>{{ props.pokemon.pokemon.status[3].calc }}</span>
        <span>D :</span><span>{{ props.pokemon.pokemon.status[4].calc }}</span>
        <span>S :</span><span>{{ props.pokemon.pokemon.status[5].calc }}</span>
    </div>
    <div class="segment">
        <div>努力値</div>
        <template v-for="(stat, index) in status" :key="index">
            <span>{{ stat.label }}</span>
            <input type="number" min="0" max="252" step="4" v-model="stat.ev" @change="handleChangeStatus">
        </template>
        <span class="totalEv">合計{{ evsTotal }}</span>
        <span class="remainEv">余り{{ 510 - evsTotal }}</span>
    </div>
    <div>
        <div>もちもの</div>
        <SelectItem :selectedItem="props.pokemon.pokemon.selectedItem" @changeItem="handleChangeItem" />
        <span>{{ props.pokemon.pokemon.selectedItem.status }}</span>
        <span>{{ props.pokemon.pokemon.selectedItem.boost }}</span>
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