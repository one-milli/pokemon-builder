<script setup>
import { onMounted, computed, ref } from 'vue'
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'

const props = defineProps({
    attacker: Object,
    defender: Object,
    move: String,
    attackerBoost: Object,
    defenderBoost: Object,
})

const attacker = props.attacker.pokemon
const defender = props.defender.pokemon

const gen = Generations.get(9);
const result = computed(() => {
    return calculate(
        gen,
        new Pokemon(gen, attacker.name, {
            level: attacker.level,
            nature: attacker.nature,
            evs: attacker.evs,
            item: attacker.item,
            boosts: props.attackerBoost,
        }),
        new Pokemon(gen, defender.name, {
            level: defender.level,
            nature: defender.nature,
            evs: defender.evs,
            item: defender.item,
            boosts: props.defenderBoost,
        }),
        new Move(gen, props.move)
    )
})

const maxDamage = computed(() => {
    if (Array.isArray(result.value.damage))
        return Math.max(...result.value.damage)
    else
        return result.value.damage
})
const minDamage = computed(() => {
    if (Array.isArray(result.value.damage))
        return Math.min(...result.value.damage)
    else
        return result.value.damage
})

const maxHp = computed(() => {
    return result.value.defender.rawStats.hp
})

const hpPercentage = computed(() => {
    return `${100}%`
})
const maxDamagePercentage = computed(() => {
    return `${Math.min(maxDamage.value / maxHp.value * 100, 100)}%`
})
const minDamagePercentage = computed(() => {
    return `${Math.min(minDamage.value / maxHp.value * 100, 100)}%`
})

const gaugeColorClass = computed(() => {
    if ((maxHp.value - maxDamage.value) / maxHp.value >= 0.5)
        return "absolute w-full h-full right-0 z-0 rounded bg-green-600"
    else if ((maxHp.value - maxDamage.value) / maxHp.value >= 0.2)
        return "absolute w-full h-full right-0 z-0 rounded bg-yellow-400"
    else
        return "absolute w-full h-full right-0 z-0 rounded bg-red-600"
})

const maxDamageClass = computed(() => {
    if (Math.min(maxDamage.value / maxHp.value * 100, 100) == 100) {
        return "absolute h-full right-0 bg-gray-500 z-10 rounded"
    } else {
        return "absolute h-full right-0 bg-gray-500 z-10 rounded-r"
    }
})

const minDamageClass = computed(() => {
    if (Math.min(minDamage.value / maxHp.value * 100, 100) == 100) {
        return "absolute h-full right-0 bg-white z-20 rounded"
    } else {
        return "absolute h-full right-0 bg-white z-20 rounded-r"
    }
})
</script>

<template>
    <div class="w-40 h-5 mx-3 my-1 relative">
        <div :class="maxDamageClass" :style="{ width: maxDamagePercentage }"></div>
        <div :class="minDamageClass" :style="{ width: minDamagePercentage }"></div>
        <div :class="gaugeColorClass"></div>
    </div>
    <span class="w-28">{{ String(minDamage) + "~" + String(maxDamage) + " / " + String(maxHp) }}</span>
    <span>&nbsp;</span>
    <span>({{ String(Math.floor(1000 * minDamage / maxHp) / 10) + "~" + String(Math.floor(1000 * maxDamage / maxHp) / 10)
        + "%" }})</span>
</template>