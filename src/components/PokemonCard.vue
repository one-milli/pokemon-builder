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
    <div class="mypokemon">
        <div class="icon">
            <img :src="iconSrc" :alt="props.pokemon.pokemon.name">
        </div>
        <div class="details">
            <PokemonStatus :pokemon="props.pokemon" />
            <slot></slot>
        </div>
        <div class="icon">
        </div>
    </div>
</template>

<style scoped>
div {
    text-align: left;
}

span {
    margin: 0 5px;
}

.mypokemon {
    display: flex;
    flex-direction: row;
    margin: 3em;
    padding: 1em;
    border: solid;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    color: #fff;
    line-height: 50px;
    font-size: 30px;
}

.icon img {
    width: 120px;
    height: 120px;
}

.details input {
    width: 4em;
}
</style>