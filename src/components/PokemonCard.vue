<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'

const props = defineProps({
    pokemon: Object,
})

const iconSrc = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.pokemon.pid}.png`
})
</script>

<template>
    <div class="flex border-2 rounded-xl m-10 p-4 text-left">
        <div class="m-2">
            <img :src="iconSrc" :alt="props.pokemon.pokemon.name">
        </div>
        <div class="m-2">
            <PokemonStatus :pokemon="props.pokemon" />
            <slot></slot>
        </div>
        <div class="icon">
        </div>
    </div>
</template>
