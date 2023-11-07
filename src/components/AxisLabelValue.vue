
<script setup>
import { computed } from 'vue'
import { valueToPoint } from '../util.js'

const props = defineProps({
    index: Number,
    originX: Number,
    originY: Number,
    label: String,
    nature: String,
})

let compensate = 0;
if (props.label == 'spe') {
    compensate = -10;
}

const point = computed(() =>
    valueToPoint(110, props.index, props.originX - 12, props.originY + 25 + compensate)
)


const natureColor = computed(() => {
    if (props.label == 'atk') {
        if (props.nature == 'adamant' || props.nature == 'brave' || props.nature == 'lonely' || props.nature == 'naughty') {
            return 'stroke-red-400'
        } else if (props.nature == 'bold' || props.nature == 'modest' || props.nature == 'calm' || props.nature == 'timid') {
            return 'stroke-blue-400'
        } else {
            return 'fill-white'
        }
    } else if (props.label == 'def') {
        if (props.nature == 'bold' || props.nature == 'impish' || props.nature == 'lax' || props.nature == 'relaxed') {
            return 'stroke-red-400'
        } else if (props.nature == 'lonely' || props.nature == 'mild' || props.nature == 'gentle' || props.nature == 'hasty') {
            return 'stroke-blue-400'
        } else {
            return 'fill-white'
        }
    } else if (props.label == 'spa') {
        if (props.nature == 'modest' || props.nature == 'mild' || props.nature == 'quiet' || props.nature == 'rash') {
            return 'stroke-red-400'
        } else if (props.nature == 'adamant' || props.nature == 'impish' || props.nature == 'careful' || props.nature == 'jolly') {
            return 'stroke-blue-400'
        } else {
            return 'fill-white'
        }
    } else if (props.label == 'spd') {
        if (props.nature == 'calm' || props.nature == 'careful' || props.nature == 'gentle' || props.nature == 'sassy') {
            return 'stroke-red-400'
        } else if (props.nature == 'naughty' || props.nature == 'lax' || props.nature == 'rash' || props.nature == 'naive') {
            return 'stroke-blue-400'
        } else {
            return 'fill-white'
        }
    } else if (props.label == 'spe') {
        if (props.nature == 'timid' || props.nature == 'hasty' || props.nature == 'jolly' || props.nature == 'naive') {
            return 'stroke-red-400'
        } else if (props.nature == 'brave' || props.nature == 'relaxed' || props.nature == 'quiet' || props.nature == 'sassy') {
            return 'stroke-blue-400'
        } else {
            return 'fill-white'
        }
    } else {
        return 'fill-white'
    }
})
</script>

<template>
    <text :x="point.x" :y="point.y" :class="natureColor">
        <slot></slot>
    </text>
</template>

<style scoped>
text {
    font-size: 15px;
    fill: #fff;
}
</style>
