<script setup>
import { computed, ref } from 'vue'
import SelectAbility from './selector/SelectAbility.vue';
import SelectItem from './selector/SelectItem.vue'
import SelectNature from './selector/SelectNature.vue'

const props = defineProps({
    pokemon: Object,
})

const name = ref(props.pokemon.name)
const level = ref(props.pokemon.level)
const status = ref(props.pokemon.status)
const abilities = ref(props.pokemon.abilities)
const selectedAbility = ref(props.pokemon.selectedAbility)
const selectedItem = ref(props.pokemon.selectedItem)
const selectedNature = ref(props.pokemon.selectedNature)

const evsTotal = computed(() => {
    return status.value.reduce((sum, stat) => sum + stat.ev, 0)
})

const calculatedStatus = computed(() => {
    return {
        hp: calc_stat(status.value[0].label, status.value[0].base, status.value[0].ev, status.value[0].iv, level.value, selectedNature.value),
        atk: calc_stat(status.value[1].label, status.value[1].base, status.value[1].ev, status.value[1].iv, level.value, selectedNature.value),
        def: calc_stat(status.value[2].label, status.value[2].base, status.value[2].ev, status.value[2].iv, level.value, selectedNature.value),
        spatk: calc_stat(status.value[3].label, status.value[3].base, status.value[3].ev, status.value[3].iv, level.value, selectedNature.value),
        spdef: calc_stat(status.value[4].label, status.value[4].base, status.value[4].ev, status.value[4].iv, level.value, selectedNature.value),
        spd: calc_stat(status.value[5].label, status.value[5].base, status.value[5].ev, status.value[5].iv, level.value, selectedNature.value)
    }
})

// methods //

const calc_stat = (label, base, ev, iv, level, nature) => {
    let natureMag = 1
    if (label == nature.boost) {
        natureMag = 1.1
    } else if (label == nature.drop) {
        natureMag = 0.9
    }
    return Math.floor(Math.floor(Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level * 0.01) + 5) * natureMag)
}

const handleChangeNature = (newNature) => {
    selectedNature.value = newNature
}
const handleChangeItem = (newItem) => {
    selectedItem.value = newItem
}
const handleChangeAbility = (newAbility) => {
    selectedAbility.value = newAbility
}

const emit = defineEmits()
const handleChangeStatus = () => {
    emit('changeStatus', calculatedStatus.value)
}
</script>

<template>
    <div class="name">{{ name }}</div>
    <div class="segment">
        <div>Lv.<input type="number" min="0" max="100" v-model="level"></div>
        <div>性格</div>
        <SelectNature :selectedNature="selectedNature" @changeNature="handleChangeNature" />
        <div>特性</div>
        <SelectAbility :abilities="abilities" :selectedAbility="selectedAbility" @changeAbility="handleChangeAbility" />
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
        <span>H :</span><span>{{ calculatedStatus.hp }}</span>
        <span>A :</span><span>{{ calculatedStatus.atk }}</span>
        <span>B :</span><span>{{ calculatedStatus.def }}</span>
        <span>C :</span><span>{{ calculatedStatus.spatk }}</span>
        <span>D :</span><span>{{ calculatedStatus.spdef }}</span>
        <span>S :</span><span>{{ calculatedStatus.spd }}</span>
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
        <SelectItem :selectedItem="selectedItem" @changeItem="handleChangeItem" />
        <span>{{ selectedItem.status }}</span>
        <span>{{ selectedItem.boost }}</span>
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