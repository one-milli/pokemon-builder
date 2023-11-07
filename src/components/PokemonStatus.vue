<script setup>
import { computed, onMounted, ref } from 'vue'
import SelectAbility from './selector/SelectAbility.vue';
import SelectItem from './selector/SelectItem.vue'
import SelectNature from './selector/SelectNature.vue'
import { calculate, Generations, Pokemon, Move } from '@smogon/calc'
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
    const stats = Object.values(props.pokemon.pokemon.evs)
    return stats.reduce((sum, val) => sum + val, 0)
})

const gen = Generations.get(9)
const pokemon = computed(() => {
    return new Pokemon(gen, props.pokemon.pokemon.name, {
        level: props.pokemon.pokemon.level,
        nature: props.pokemon.pokemon.nature,
        evs: props.pokemon.pokemon.evs,
        ivs: props.pokemon.pokemon.ivs,
        item: props.pokemon.pokemon.item,
    })
})
</script>

<template>
    <div class="text-2xl font-bold">{{ PokemonNameTranslate[props.pokemon.pokemon.name] }}</div>
    <div class="flex">
        <div>
            Lv.<input type="number" min="1" max="100" v-model="props.pokemon.pokemon.level" class="w-11">
        </div>
        <div>性格</div>
        <SelectNature :pokemon="props.pokemon" />
        <div>特性</div>
        <SelectAbility :pokemon="props.pokemon" />
        <div>持ち物</div>
        <SelectItem :pokemon="props.pokemon" />
    </div>
    <div class="flex">
        <div>種族値</div>
        <template v-for="(stat, key, index) in pokemon.species.baseStats" :key="index">
            <span class="mx-1">{{ labelConversion[key] }} :</span>
            <span class="w-8">{{ stat }}</span>
        </template>
    </div>
    <div class="flex">
        <div>実数値</div>
        <span class="mx-1">H :</span><span class="w-8">{{ pokemon.rawStats.hp }}</span>
        <span class="mx-1">A :</span><span class="w-8">{{ pokemon.rawStats.atk }}</span>
        <span class="mx-1">B :</span><span class="w-8">{{ pokemon.rawStats.def }}</span>
        <span class="mx-1">C :</span><span class="w-8">{{ pokemon.rawStats.spa }}</span>
        <span class="mx-1">D :</span><span class="w-8">{{ pokemon.rawStats.spd }}</span>
        <span class="mx-1">S :</span><span class="w-8">{{ pokemon.rawStats.spe }}</span>
    </div>
    <div class="flex">
        <div>努力値</div>
        <span class="mx-1">H</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.hp" class="w-12">
        <span class="mx-1">A</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.atk" class="w-12">
        <span class="mx-1">B</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.def" class="w-12">
        <span class="mx-1">C</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.spa" class="w-12">
        <span class="mx-1">D</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.spd" class="w-12">
        <span class="mx-1">S</span>
        <input type="number" min="0" max="252" step="4" v-model="props.pokemon.pokemon.evs.spe" class="w-12">
        <span class="w-16 mx-1">合計{{ evsTotal }}</span>
        <span class="w-16 mx-1">余り{{ 510 - evsTotal }}</span>
    </div>
</template>
