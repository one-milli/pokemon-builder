<script setup>
import { ref, watch } from 'vue'
import { useEnemyPokemonsStore } from '../store/enemyPokemons'

const enemyPokemonsStore = useEnemyPokemonsStore()
const searchQuery = ref('')
const selectedOption = ref(0)
const options = ref([
    { id: 1, name: 'bulbasaur', name_ja: 'フシギダネ' },
    { id: 2, name: 'ivysaur', name_ja: 'フシギソウ' },
    { id: 3, name: 'venusaur', name_ja: 'フシギバナ' },
    { id: 4, name: 'charmander', name_ja: 'ヒトカゲ' },
    { id: 5, name: 'charmeleon', name_ja: 'リザード' },
])
const filteredOptions = ref([])

watch(searchQuery, (newValue) => {
    const katakanaQuery = hiraganaToKatakana(newValue)
    if (newValue === '') {
        filteredOptions.value = []
    } else {
        filteredOptions.value = options.value.filter(option =>
            option.name_ja.startsWith(katakanaQuery) || option.name_ja.startsWith(newValue)
        )
    }
})

const selectOption = (option) => {
    filteredOptions.value = []
    searchQuery.value = option.name_ja
    selectedOption.value = option.id
}
const handleSubmit = () => {
    const addPokemonId = selectedOption.value
    const addPokemonName = options.value.find(option => option.id == addPokemonId).name
    enemyPokemonsStore.handleAddPokemon(addPokemonId, addPokemonName)
    filteredOptions.value = []
    searchQuery.value = ''
    selectedOption.value = 0
}

const hiraganaToKatakana = (str) => {
    return str.replace(/[\u3041-\u3096]/g, match =>
        String.fromCharCode(match.charCodeAt(0) + 0x60)
    )
}
</script>

<template>
    <div class="w-2/3 mx-auto mb-80 gap-4 p-4 border-2 border-gray-300 rounded-xl">
        <div class="flex">
            <div class="flex-1 mr-3">
                <input type="text" v-model="searchQuery" class="p-2 w-full h-11 border border-gray-300 rounded"
                    placeholder="敵ポケモンを追加" />
                <ul v-if="filteredOptions.length > 0" class="text-left">
                    <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)"
                        class="p-2 hover:bg-gray-600 cursor-pointer">
                        {{ option.name_ja }}
                    </li>
                </ul>
            </div>
            <button :disabled="!selectedOption" @click="handleSubmit"
                class="self-start px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
                追加
            </button>
        </div>
    </div>
</template>
