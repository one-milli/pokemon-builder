<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    selectedMoveId: Number
})
const emit = defineEmits()

const allMoves = ref([
    { id: 1, label: "じしん", type: "じめん", power: 100, accuracy: 100, pp: 10 },
    { id: 2, label: "げきりん", type: "ノーマル", power: 120, accuracy: 100, pp: 5 },
    { id: 3, label: "アイアンヘッド", type: "ノーマル", power: 120, accuracy: 100, pp: 5 },
    { id: 4, label: "スケイルショット", type: "ノーマル", power: 120, accuracy: 100, pp: 5 },
    { id: 5, label: "かみくだく", type: "ノーマル", power: 120, accuracy: 100, pp: 5 },
    { id: 6, label: "きりさく", type: "ノーマル", power: 120, accuracy: 100, pp: 5 },
])

const selectedMoveId = ref(props.selectedMoveId)
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
