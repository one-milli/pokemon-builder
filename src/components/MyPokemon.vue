<script setup>
import { computed, ref } from 'vue'
import NatureSelect from './NatureSelect.vue'

const level = ref(50)

const status = ref([
    { label: "H", base: 108, ev: 0, iv: 31 },
    { label: "A", base: 130, ev: 0, iv: 31 },
    { label: "B", base: 95, ev: 0, iv: 31 },
    { label: "C", base: 80, ev: 0, iv: 31 },
    { label: "D", base: 85, ev: 0, iv: 31 },
    { label: "S", base: 102, ev: 0, iv: 31 }
])

const natures = ref([
    { label: "さみしがり", boost: "A", drop: "B" },
    { label: "いじっぱり", boost: "A", drop: "C" },
    { label: "やんちゃ", boost: "A", drop: "D" },
    { label: "ゆうかん", boost: "A", drop: "S" },
    { label: "ずぶとい", boost: "B", drop: "A" },
    { label: "わんぱく", boost: "B", drop: "C" },
    { label: "のうてんき", boost: "B", drop: "D" },
    { label: "のんき", boost: "B", drop: "S" },
    { label: "ひかえめ", boost: "C", drop: "A" },
    { label: "おっとり", boost: "C", drop: "B" },
    { label: "うっかりや", boost: "C", drop: "D" },
    { label: "れいせい", boost: "C", drop: "S" },
    { label: "おだやか", boost: "D", drop: "A" },
    { label: "おとなしい", boost: "D", drop: "B" },
    { label: "しんちょう", boost: "D", drop: "C" },
    { label: "なまいき", boost: "D", drop: "S" },
    { label: "おくびょう", boost: "S", drop: "A" },
    { label: "せっかち", boost: "S", drop: "B" },
    { label: "ようき", boost: "S", drop: "C" },
    { label: "むじゃき", boost: "S", drop: "D" },
    { label: "まじめ", boost: "", drop: "" },
])

const selectedNature = ref({ label: "いじっぱり", boost: "A", drop: "C" })

const evsTotal = computed(() => {
    return status.value.reduce((sum, stat) => sum + stat.ev, 0)
})

const stats = computed(() => {
    return {
        hp: calc_stat(status.value[0].label, status.value[0].base, status.value[0].ev, status.value[0].iv, level.value, selectedNature.value),
        atk: calc_stat(status.value[1].label, status.value[1].base, status.value[1].ev, status.value[1].iv, level.value, selectedNature.value),
        def: calc_stat(status.value[2].label, status.value[2].base, status.value[2].ev, status.value[2].iv, level.value, selectedNature.value),
        spatk: calc_stat(status.value[3].label, status.value[3].base, status.value[3].ev, status.value[3].iv, level.value, selectedNature.value),
        spdef: calc_stat(status.value[4].label, status.value[4].base, status.value[4].ev, status.value[4].iv, level.value, selectedNature.value),
        spd: calc_stat(status.value[5].label, status.value[5].base, status.value[5].ev, status.value[5].iv, level.value, selectedNature.value)
    }
})

// function //

function calc_stat(label, base, ev, iv, level, nature) {
    let natureMag = 1
    if (label == nature.boost) {
        natureMag = 1.1
    } else if (label == nature.drop) {
        natureMag = 0.9
    }
    return Math.floor(Math.floor(Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level * 0.01) + 5) * natureMag)
}

</script>

<template>
    <div class="mypokemon">
        <div class="icon">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png" alt="ガブリアス">
        </div>
        <div class="details">
            <div class="name">ガブリアス</div>
            <div class="segment">
                <span>Lv.<input type="number" min="0" max="100" v-model="level"></span>
                <span>性格</span>
                <select v-model="selectedNature">
                    <option v-for="nature in natures" :value="nature">{{ nature.label }}</option>
                </select>
            </div>
            <div class="segment">
                <span>種族値</span>
                <template v-for="(stat, index) in status" :key="index">
                    <span>{{ stat.label }} :</span>
                    <span>{{ stat.base }}</span>
                </template>
            </div>
            <div class="segment">
                <span>実数値</span>
                <span>H :</span><span>{{ stats.hp }}</span>
                <span>A :</span><span>{{ stats.atk }}</span>
                <span>B :</span><span>{{ stats.def }}</span>
                <span>C :</span><span>{{ stats.spatk }}</span>
                <span>D :</span><span>{{ stats.spdef }}</span>
                <span>S :</span><span>{{ stats.spd }}</span>
            </div>
            <div class="segment">
                <span>努力値</span>
                <template v-for="(stat, index) in status" :key="index">
                    <span>{{ stat.label }}</span>
                    <input type="number" min="0" max="252" step="4" v-model="stat.ev">
                </template>
                <span class="totalEv">合計{{ evsTotal }}</span>
                <span class="remainEv">余り{{ 510 - evsTotal }}</span>
            </div>
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
    align-items: center;
    margin: 3em;
    padding: 2em;
    border: solid;
}


.icon {
    border: solid;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    color: #fff;
    line-height: 50px;
    font-size: 30px;
    margin: 10px;
}

.segment * {
    display: inline-block;
}

.details input {
    width: 4em;
}


.name {
    font-size: 1.5em;
    font-weight: bold;
}

.totalEv,
.remainEv {
    width: 60px;
}
</style>