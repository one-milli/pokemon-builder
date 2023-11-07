
<script setup>
import { computed } from 'vue'
import { valueToPoint } from '../util.js'

const props = defineProps({
    index: Number,
    originX: Number,
    originY: Number,
    label: String,
})

let compensate = 0;
if (props.label == 'spe') {
    compensate = -10;
}

const point = computed(() =>
    valueToPoint(110, props.index, props.originX - 12, props.originY + 25 + compensate)
)
</script>

<template>
    <text :x="point.x" :y="point.y">
        <slot></slot>
    </text>
</template>

<style scoped>
text {
    font-size: 15px;
    fill: #fff;
}
</style>
