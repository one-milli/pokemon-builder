<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    allMoves: Array,
    selectedMoveId: Number
})

const selectedMoveId = ref(props.selectedMoveId)

const emit = defineEmits()
const selectedMove = computed({
    get: () => props.selectedMoveId,
    set: (value) => {
        selectedMoveId.value = value;
        emit('changeMove', value);
    }
})

</script>

<template>
    <div>
        <select v-model="selectedMove">
            <option v-for="move in props.allMoves" :key="move.id" :value="move.id">{{ move.label }}</option>
        </select>
    </div>
</template>
