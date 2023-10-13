<script setup>
import { ref } from "vue";

const props = defineProps({
    selectedItem: Object,
});

const selectedItem = ref(props.selectedItem);
const items = ref([
    { label: "いのちのたま", status: ["A", "C"], boost: 1.3, conditionId: 1 },
    { label: "こだわりハチマキ", status: ["A"], boost: 1.5, conditionId: 1 },
    { label: "こだわりメガネ", status: ["C"], boost: 1.5, conditionId: 1 },
    { label: "とつげきチョッキ", status: ["D"], boost: 1.5, conditionId: 1 },
    { label: "しんかのきせき", status: ["B", "D"], boost: 1.5, conditionId: 2 },
]);

const emit = defineEmits();
const handleChangeItem = () => {
    emit("changeItem", selectedItem.value);
};
</script>

<template>
    <select v-model="selectedItem" @change="handleChangeItem">
        <option v-for="item in items" :key="item.label" :value="item">
            {{ item.label }}
        </option>
    </select>
</template>
