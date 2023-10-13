<script setup>
import { ref } from "vue";

const props = defineProps({
    abilities: Array,
    selectedAbility: Object,
});

const abilities = props.abilities;
const selectedAbility = ref(props.selectedAbility);

const emit = defineEmits();
const handleChangeAbility = () => {
    emit("changeAbility", selectedAbility.value);
};
</script>

<template>
    <select v-model="selectedAbility" @change="handleChangeAbility">
        <option v-for="ability in abilities" :key="ability.label" :value="ability">
            {{ ability.label }}
        </option>
    </select>
</template>
