import { defineStore } from "pinia";

export const useMyPokemonsStore = defineStore("myPokemons", {
  state: () => ({
    myPokemons: [
      {
        buildId: 1,
        pokemon: {
          id: 445,
          name: "ガブリアス",
          level: 50,
          status: [
            { label: "H", base: 108, ev: 0, iv: 31 },
            { label: "A", base: 130, ev: 0, iv: 31 },
            { label: "B", base: 95, ev: 0, iv: 31 },
            { label: "C", base: 80, ev: 0, iv: 31 },
            { label: "D", base: 85, ev: 0, iv: 31 },
            { label: "S", base: 102, ev: 0, iv: 31 },
          ],
          abilities: [
            { label: "すながくれ", type: 0 },
            { label: "さめはだ", type: 0 },
          ],
          selectedAbility: { label: "さめはだ", type: 0 },
          selectedItem: {
            label: "いのちのたま",
            status: ["A", "C"],
            boost: 1.3,
            conditionId: 1,
          },
          selectedNature: { label: "いじっぱり", boost: "A", drop: "C" },
          moveIds: { slot1: 1, slot2: 2, slot3: 3, slot4: 4 },
        },
      },
      {
        buildId: 2,
        pokemon: {
          name: "クレセリア",
          level: 50,
          status: [
            { label: "H", base: 120, ev: 0, iv: 31 },
            { label: "A", base: 70, ev: 0, iv: 31 },
            { label: "B", base: 110, ev: 0, iv: 31 },
            { label: "C", base: 75, ev: 0, iv: 31 },
            { label: "D", base: 120, ev: 0, iv: 31 },
            { label: "S", base: 85, ev: 0, iv: 31 },
          ],
          abilities: [{ label: "ふゆう", type: 1 }],
          selectedAbility: { label: "ふゆう", type: 1 },
          selectedItem: {
            label: "とつげきチョッキ",
            status: ["D"],
            boost: 1.5,
            conditionId: 1,
          },
          selectedNature: { label: "ずぶとい", boost: "B", drop: "A" },
          moveIds: { slot1: 7, slot2: 2, slot3: 3, slot4: 4 },
        },
      },
    ],
  }),
  actions: {
    handleChangeMove(newMove, slot, buildId) {
      this.myPokemons[buildId].pokemon.moveIds["slot" + slot] = newMove;
    },
  },
});
