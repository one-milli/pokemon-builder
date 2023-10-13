<script setup>
import { computed, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import SelectMove from './selector/SelectMove.vue'

const props = defineProps({
    allMoves: Array
})

const name = "クレセリア"
const level = 50
const status = [
    { label: "H", base: 120, ev: 0, iv: 31 },
    { label: "A", base: 70, ev: 0, iv: 31 },
    { label: "B", base: 110, ev: 0, iv: 31 },
    { label: "C", base: 75, ev: 0, iv: 31 },
    { label: "D", base: 120, ev: 0, iv: 31 },
    { label: "S", base: 85, ev: 0, iv: 31 }
]
const abilities = [
    { label: "ふゆう", type: 1 },
]
const selectedAbility = { label: "ふゆう", type: 1 }
const selectedItem = { label: "とつげきチョッキ", status: ["D"], boost: 1.5, conditionId: 1 }
const selectedNature = { label: "ずぶとい", boost: "B", drop: "A" }
const allMoves = props.allMoves

const moveIds = ref({ slot1: 7, slot2: 2, slot3: 3, slot4: 4 })

// methods //

const findMove = (id) => {
    return allMoves.find((move) => move.id == id)
}

const handleChangeMove = (newMove, slot) => {
    moveIds.value['slot' + slot] = newMove
}
</script>

<template>
    <div class="mypokemon">
        <div class="icon">
            <!--<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/488.png" alt="クレセリア">
            -->
        </div>
        <div class="details">
            <PokemonStatus :name="name" :level="level" :status="status" :abilities="abilities"
                :selectedAbility="selectedAbility" :selectedItem="selectedItem" :selectedNature="selectedNature" />
            <h3>与ダメージ</h3>
            <div class="moves">
                <div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot1"
                            @changeMove="(move) => handleChangeMove(move, 1)" />
                        <div>
                            <span>{{ findMove(moveIds.slot1).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot1).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot2"
                            @changeMove="(move) => handleChangeMove(move, 2)" />
                        <div>
                            <span>{{ findMove(moveIds.slot2).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot2).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot3"
                            @changeMove="(move) => handleChangeMove(move, 3)" />
                        <div>
                            <span>{{ findMove(moveIds.slot3).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot3).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot4"
                            @changeMove="(move) => handleChangeMove(move, 4)" />
                        <div>
                            <span>{{ findMove(moveIds.slot4).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot4).power }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <h3>被ダメージ</h3>
            <div class="moves">
                <div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot1"
                            @changeMove="(move) => handleChangeMove(move, 1)" />
                        <div>
                            <span>{{ findMove(moveIds.slot1).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot1).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot2"
                            @changeMove="(move) => handleChangeMove(move, 2)" />
                        <div>
                            <span>{{ findMove(moveIds.slot2).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot2).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot3"
                            @changeMove="(move) => handleChangeMove(move, 3)" />
                        <div>
                            <span>{{ findMove(moveIds.slot3).type }}</span>
                            <span>威力: {{ findMove(moveIds.slot3).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="moveIds.slot4"
                            @changeMove="(move) => handleChangeMove(move, 4)" />
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

.details input {
    width: 4em;
}

.moves {
    display: flex;
    flex-direction: row;
}

.move {
    display: flex;
}
</style>