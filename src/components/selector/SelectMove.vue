<script setup>
import { computed, inject, ref } from 'vue'

const props = defineProps({
    selectedMoveId: Number
})

const allMoves = inject('allMoves')
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
            <option v-for="move in allMoves" :key="move.id" :value="move.id">{{ move.label }}</option>
        </select>
    </div>
</template>
