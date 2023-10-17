<script setup>
import { onMounted, computed, ref } from 'vue'

const props = defineProps({
    attacker: Object,
    defender: Object,
    move: Object,
    attackerStatusRank: Object,
    defenderStatusRank: Object,
})

const attackerAttack = computed(() => {
    return props.attacker.pokemon.status[1].calc * (props.attackerStatusRank.A + 2) / 2
})
const defenderDefense = computed(() => {
    return props.defender.pokemon.status[2].calc * (props.defenderStatusRank.D + 2) / 2
})

const maxDamage = computed(() => {
    //fix
    return Math.floor(Math.floor(Math.floor(props.attacker.pokemon.level * 2 / 5 + 2) * props.move.power * attackerAttack.value / defenderDefense.value) / 50 + 2)
})
const minDamage = computed(() => {
    return Math.floor(maxDamage.value * 0.85)
})

const maxHp = computed(() => {
    return props.defender.pokemon.status[0].calc
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
</template>

<style scoped>
.gauge-container {
    width: 200px;
    height: 20px;
    margin: 2px 10px;
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