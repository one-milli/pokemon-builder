<script setup>
import { computed } from 'vue'
import SelectAbility from './selector/SelectAbility.vue';
import SelectItem from './selector/SelectItem.vue'
import SelectNature from './selector/SelectNature.vue'
import { Generations, Pokemon } from '@smogon/calc'
import PokemonNameTranslate from '../translate/PokemonNameTranslate'

const props = defineProps({
    pokemon: Object,
})

const labelConversion = {
    hp: 'H',
    atk: 'A',
    def: 'B',
    spa: 'C',
    spd: 'D',
    spe: 'S',
}

const evsTotal = computed(() => {
    const stats = Object.values(props.pokemon.evs)
    return stats.reduce((sum, val) => sum + val, 0)
})

const gen = Generations.get(9)
const pokemon = computed(() => {
    return new Pokemon(gen, props.pokemon.name, {
        level: props.pokemon.level,
        nature: props.pokemon.nature,
        evs: props.pokemon.evs,
        ivs: props.pokemon.ivs,
        item: props.pokemon.item,
    })
})
</script>

<template>
    <div class="flex mb-1">
        <div class="text-2xl font-bold">{{ PokemonNameTranslate[props.pokemon.name] }}</div>
        <div class="ml-4 mt-1">(
            <template v-for="(stat, key, index) in pokemon.species.baseStats" :key="index">
                <span class="mx-1">{{ stat }}</span>
            </template>
            )
        </div>
    </div>
    <div class="flex mb-1">
        <div class="mr-2">
            Lv.<input type="number" min="1" max="100" v-model="props.pokemon.level" class="w-11">
        </div>
        <SelectAbility :pokemon="props.pokemon" class="mr-2" />
        <SelectNature :pokemon="props.pokemon" class="mr-2" />
        <SelectItem :pokemon="props.pokemon" class="mr-2" />
    </div>
    <div class="flex mb-1">
        <template v-for="(stat, key, index) in props.pokemon.evs" :key="index">
            <div class="flex">
                <span class="mr-1">{{ labelConversion[key] }}</span>
                <input type="number" min="0" max="252" step="4" v-model="props.pokemon.evs[key]" class="w-12 mr-1">
            </div>
        </template>
        <span class="w-16 mr-1">合計{{ evsTotal }}</span>
        <span class="w-16 mr-1">余り{{ 510 - evsTotal }}</span>
    </div>
</template>
