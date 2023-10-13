<script setup>
import { computed, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import SelectMove from './selector/SelectMove.vue'

const name = ref("ガブリアス")

const level = ref(50)

const status = ref([
    { label: "H", base: 108, ev: 0, iv: 31 },
    { label: "A", base: 130, ev: 0, iv: 31 },
    { label: "B", base: 95, ev: 0, iv: 31 },
    { label: "C", base: 80, ev: 0, iv: 31 },
    { label: "D", base: 85, ev: 0, iv: 31 },
    { label: "S", base: 102, ev: 0, iv: 31 }
])

const moveIds = ref({ slot1: 1, slot2: 2, slot3: 3, slot4: 4 })

const selectedNature = ref({ label: "いじっぱり", boost: "A", drop: "C" })

const selectedItem = ref({ label: "いのちのたま", status: ["A", "C"], boost: 1.3, conditionId: 1 })

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

const allMoves = ref([
    { id: 1, label: "じしん", type: "じめん", power: 100, accuracy: 100, pp: 10 },
    { id: 2, label: "げきりん", type: "ドラゴン", power: 120, accuracy: 100, pp: 5 },
    { id: 3, label: "アイアンヘッド", type: "はがね", power: 80, accuracy: 100, pp: 15 },
    { id: 4, label: "スケイルショット", type: "ドラゴン", power: 25, accuracy: 100, pp: 15 },
    { id: 5, label: "かみくだく", type: "あく", power: 80, accuracy: 100, pp: 15 },
    { id: 6, label: "きりさく", type: "ノーマル", power: 80, accuracy: 100, pp: 15 },
])

// methods //

const calc_stat = (label, base, ev, iv, level, nature) => {
    let natureMag = 1
    if (label == nature.boost) {
        natureMag = 1.1
    } else if (label == nature.drop) {
        natureMag = 0.9
    }
    return Math.floor(Math.floor(Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level * 0.01) + 5) * natureMag)
}

const findMove = (id) => {
    return allMoves.value.find((move) => move.id == id)
}

const handleChangeMove = (newMove, slot) => {
    moveIds.value['slot' + slot] = newMove
}
</script>

<template>
    <div class="mypokemon">
        <div class="icon">
            <!--<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png" alt="ガブリアス">
            -->
        </div>
        <div class="details">
            <PokemonStatus />
            <div class="moves">
                <div>わざ</div>
                <div>
                    <div class="move">
                        <SelectMove :selectedMoveId="moveIds.slot1" @changeMove="(move) => handleChangeMove(move, 1)" />
                        <div>
                            <span>{{ findMove(moveIds.slot1).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot1).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :selectedMoveId="moveIds.slot2" @changeMove="(move) => handleChangeMove(move, 2)" />
                        <div>
                            <span>{{ findMove(moveIds.slot2).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot2).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :selectedMoveId="moveIds.slot3" @changeMove="(move) => handleChangeMove(move, 3)" />
                        <div>
                            <span>{{ findMove(moveIds.slot3).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot3).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :selectedMoveId="moveIds.slot4" @changeMove="(move) => handleChangeMove(move, 4)" />
                        <div>
                            <span>{{ findMove(moveIds.slot4).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot4).power }}</span>
                        </div>
                    </div>
                </div>
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

.moves {
    display: flex;
    flex-direction: row;
}

.move {
    display: flex;
}
</style>