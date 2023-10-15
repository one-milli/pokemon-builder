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
    return props.attacker.status[1].base * (props.attackerStatusRank.A + 2) / 2
})
const defenderDefense = computed(() => {
    return props.defender.status[2].base * (props.defenderStatusRank.D + 2) / 2
})

const maxDamage = computed(() => {
    //fix
    return Math.floor(Math.floor(Math.floor(props.attacker.level * 2 / 5 + 2) * props.move.power * attackerAttack.value / defenderDefense.value) / 50 + 2)
})
const minDamage = computed(() => {
    return Math.floor(maxDamage.value * 0.85)
})

</script>

<template>
    <span>{{ minDamage }}</span>
    <span>~</span>
    <span>{{ maxDamage }}</span>
</template>