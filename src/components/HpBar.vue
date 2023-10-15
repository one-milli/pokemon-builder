<script setup>
import { onMounted, computed, ref } from 'vue'

const props = defineProps({
    attacker: Object,
    defender: Object,
    move: Object,
    attackerStatusRank: Object,
    defenderStatusRank: Object,
})

const attacker = ref(props.attacker)
const defender = ref(props.defender)
const move = ref(props.move)
const attackerStatusRank = ref(props.attackerStatusRank)
const defenderStatusRank = ref(props.defenderStatusRank)

const attackerAttack = computed(() => {
    return attacker.value.status[1].base * (attackerStatusRank.value.A + 2) / 2
})
const defenderDefense = computed(() => {
    return defender.value.status[2].base * (defenderStatusRank.value.D + 2) / 2
})

const maxDamage = computed(() => {
    //fix
    return Math.floor(Math.floor(Math.floor(attacker.value.level * 2 / 5 + 2) * move.value.power * attackerAttack.value / defenderDefense.value) / 50 + 2)
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