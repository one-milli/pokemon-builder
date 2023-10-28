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
    <div class="flex border-2 rounded-xl m-8 p-4 text-left">
        <div class="m-2">
            <img :src="iconSrc" :alt="props.pokemon.pokemon.name" class="w-36">
        </div>
        <div class="m-2">
            <PokemonStatus :pokemon="props.pokemon" />
            <slot></slot>
        </div>
        <div class="w-40">
        </div>
    </div>
</template>
