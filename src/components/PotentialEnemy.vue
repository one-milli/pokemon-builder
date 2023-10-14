<script setup>
import { computed, ref } from 'vue'
import PokemonStatus from './PokemonStatus.vue'
import SelectMove from './selector/SelectMove.vue'

const props = defineProps({
    myPokemon: Object,
    enemyPokemon: Object,
    allMoves: Array
})

const myPokemon = ref(props.myPokemon)
const enemyPokemon = ref(props.enemyPokemon)
const allMoves = props.allMoves

// methods //

const findMove = (id) => {
    return allMoves.find((move) => move.id == id)
}

const handleChangeMove = (newMove, slot) => {
    enemyPokemon.value.enemyMoveIds['slot' + slot] = newMove
}
</script>

<template>
    <div class="mypokemon">
        <div class="icon">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/488.png" alt="クレセリア">
        </div>
        <div class="details">
            <PokemonStatus :name="enemyPokemon.name" :level="enemyPokemon.level" :status="enemyPokemon.status"
                :abilities="enemyPokemon.abilities" :selectedAbility="enemyPokemon.selectedAbility"
                :selectedItem="enemyPokemon.selectedItem" :selectedNature="enemyPokemon.selectedNature" />
            <div>与ダメージ</div>
            <div class="moves">
                <div>
                    <div class="move">
                        <div>
                            <span>{{ findMove(myPokemon.moveIds.slot1).label }}</span>
                            <span>{{ findMove(myPokemon.moveIds.slot1).type }}</span>
                            <span>威力: {{ findMove(myPokemon.moveIds.slot1).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <div>
                            <span>{{ findMove(myPokemon.moveIds.slot2).label }}</span>
                            <span>{{ findMove(myPokemon.moveIds.slot2).type }}</span>
                            <span>威力: {{ findMove(myPokemon.moveIds.slot2).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <div>
                            <span>{{ findMove(myPokemon.moveIds.slot3).label }}</span>
                            <span>{{ findMove(myPokemon.moveIds.slot3).type }}</span>
                            <span>威力: {{ findMove(myPokemon.moveIds.slot3).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <div>
                            <span>{{ findMove(myPokemon.moveIds.slot4).label }}</span>
                            <span>{{ findMove(myPokemon.moveIds.slot4).type }}</span>
                            <span>威力: {{ findMove(myPokemon.moveIds.slot4).power }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>被ダメージ</div>
            <div class="moves">
                <div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="enemyPokemon.enemyMoveIds.slot1"
                            @changeMove="(move) => handleChangeMove(move, 1)" />
                        <div>
                            <span>{{ findMove(enemyPokemon.enemyMoveIds.slot1).type }}</span>
                            <span>威力: {{ findMove(enemyPokemon.enemyMoveIds.slot1).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="enemyPokemon.enemyMoveIds.slot2"
                            @changeMove="(move) => handleChangeMove(move, 2)" />
                        <div>
                            <span>{{ findMove(enemyPokemon.enemyMoveIds.slot2).type }}</span>
                            <span>威力: {{ findMove(enemyPokemon.enemyMoveIds.slot2).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="enemyPokemon.enemyMoveIds.slot3"
                            @changeMove="(move) => handleChangeMove(move, 3)" />
                        <div>
                            <span>{{ findMove(enemyPokemon.enemyMoveIds.slot3).type }}</span>
                            <span>威力: {{ findMove(enemyPokemon.enemyMoveIds.slot3).power }}</span>
                        </div>
                    </div>
                    <div class="move">
                        <SelectMove :allMoves="allMoves" :selectedMoveId="enemyPokemon.enemyMoveIds.slot4"
                            @changeMove="(move) => handleChangeMove(move, 4)" />
                        <div>
                            <span>{{ findMove(enemyPokemon.enemyMoveIds.slot4).type }}</span>
                            <span>威力: {{ findMove(enemyPokemon.enemyMoveIds.slot4).power }}</span>
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