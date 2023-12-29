<script setup>
import { computed } from 'vue'
import AxisLabel from './AxisLabel.vue'
import AxisLabelValue from './AxisLabelValue.vue'
import { valueToPoint } from '../util.js'

const props = defineProps({
    values: Object,
    className: String,
    nature: String,
})

const originX = 120
const originY = 120
const radius = 80

const orderedValues = computed(() => {
    return {
        hp: props.values.hp,
        atk: props.values.atk,
        def: props.values.def,
        spe: props.values.spe,
        spd: props.values.spd,
        spa: props.values.spa,
    }
})
const valuesList = computed(() => Object.values(orderedValues.value))

const points = computed(() => valuesList.value
    .map((val, i) => {
        if (props.className == 'ev') {
            const { x, y } = valueToPoint(ev2length(val), i, originX, originY)
            return `${x},${y}`
        } else {
            const { x, y } = valueToPoint(rv2length(val), i, originX, originY)
            return `${x},${y}`
        }
    })
    .join(' ')
)

const ev2length = (ev) => {
    return 10 + ev * (radius - 10) / 252
}

const rv2length = (rv) => {
    return radius / (1 + Math.exp(-0.02 * (rv - 107)))
}

const labelConversion = {
    hp: '　HP',
    atk: 'こうげき',
    def: 'ぼうぎょ',
    spa: 'とくこう',
    spd: 'とくぼう',
    spe: 'すばやさ',
}
</script>

<template>
    <g>
        <polygon :points="points" :class="props.className" />
        <circle :cx="originX" :cy="originY" :r="radius" class="fill-transparent stroke-gray-300" />
        <AxisLabel v-for="(val, key, index) in orderedValues" :index="index" :key="index" :originX="originX"
            :originY="originY" :label="key">
            {{ labelConversion[key] }}
        </AxisLabel>
        <AxisLabelValue v-if="props.className == 'rv'" v-for="(val, key, index) in orderedValues" :index="index"
            :key="index" :originX="originX" :originY="originY" :label="key" :nature="props.nature">
            {{ val }}
        </AxisLabelValue>
    </g>
</template>

<style scoped>
.rv {
    fill: #42b983;
    opacity: 0.8;
}

.ev {
    fill: #fbbc04;
    opacity: 0.5;
}
</style>