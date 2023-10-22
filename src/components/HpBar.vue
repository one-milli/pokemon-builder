<script setup>
import { onMounted, computed, ref } from 'vue'
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'

const props = defineProps({
    attacker: Object,
    defender: Object,
    move: Object,
    attackerBoost: Object,
    defenderBoost: Object,
})

const attacker = props.attacker.pokemon
const defender = props.defender.pokemon
const move = props.move.label

const gen = Generations.get(5);
const result = computed(() => {
    return calculate(
        gen,
        new Pokemon(gen, attacker.name, {
            item: attacker.item,
            nature: attacker.nature,
            evs: attacker.evs,
            boosts: props.attackerBoost,
            level: attacker.level,
        }),
        new Pokemon(gen, defender.name, {
            item: defender.item,
            nature: defender.nature,
            evs: defender.evs,
            boosts: props.defenderBoost,
            level: defender.level,
        }),
        new Move(gen, move)
    )
})

const maxDamage = computed(() => {
    return Math.max(...result.value.damage)
})
const minDamage = computed(() => {
    return Math.min(...result.value.damage)
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
        return "gauge-bar current-hp safe"
    else if ((maxHp.value - maxDamage.value) / maxHp.value >= 0.2)
        return "gauge-bar current-hp caution"
    else
        return "gauge-bar current-hp danger"
}) 
</script>

<template>
    <div class="gauge-container">
        <div class="gauge-bar max-damage" :style="{ width: maxDamagePercentage }"></div>
        <div class="gauge-bar min-damage" :style="{ width: minDamagePercentage }"></div>
        <div :class="gaugeColorClass" :style="{ width: hpPercentage }"></div>
    </div>
    <span>{{ String(minDamage) + "~" + String(maxDamage) + " / " + String(maxHp) }}</span>
    <span>&nbsp;</span>
    <span>({{ String(Math.floor(1000 * minDamage / maxHp) / 10) + "~" + String(Math.floor(1000 * maxDamage / maxHp) / 10)
        + "%" }})</span>
</template>

<style scoped>
.gauge-container {
    width: 200px;
    height: 20px;
    margin: 3px 10px;
    background-color: #ddd;
    position: relative;
    border-radius: 6px;
}

.gauge-bar {
    height: 100%;
    position: absolute;
    right: 0;
}

.max-damage {
    background-color: gray;
    z-index: 9;
    border-radius: 0 4px 4px 0;
}

.min-damage {
    background-color: white;
    z-index: 10;
    border-radius: 0 4px 4px 0;
}

.current-hp {
    z-index: 8;
    border-radius: 3px;
}

.safe {
    background-color: green;
}

.caution {
    background-color: yellow;
}

.danger {
    background-color: red;
}
</style>