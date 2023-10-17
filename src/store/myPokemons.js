import { defineStore } from "pinia";

export const useMyPokemonsStore = defineStore("myPokemons", {
  state: () => ({
    myPokemons: [
      {
        buildId: 0,
        pokemon: {
          id: 445,
          name: "ガブリアス",
          level: 50,
          status: [
            { label: "H", calc: 0, base: 108, ev: 0, iv: 31 },
            { label: "A", calc: 0, base: 130, ev: 0, iv: 31 },
            { label: "B", calc: 0, base: 95, ev: 0, iv: 31 },
            { label: "C", calc: 0, base: 80, ev: 0, iv: 31 },
            { label: "D", calc: 0, base: 85, ev: 0, iv: 31 },
            { label: "S", calc: 0, base: 102, ev: 0, iv: 31 },
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
        buildId: 1,
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
    calcStatus(label, base, ev, iv, level, nature) {
      let natureMag = 1;
      if (label == nature.boost) {
        natureMag = 1.1;
      } else if (label == nature.drop) {
        natureMag = 0.9;
      }
      return Math.floor(
        Math.floor(
          Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level * 0.01) + 5
        ) * natureMag
      );
    },
    updateStatus(buildId) {
      this.myPokemons[buildId].pokemon.status.forEach((status) => {
        status.calc = this.calcStatus(
          status.label,
          status.base,
          status.ev,
          status.iv,
          this.myPokemons[buildId].pokemon.level,
          this.myPokemons[buildId].pokemon.selectedNature
        );
      });
    },
    handleChangeMove(newMove, slot, buildId) {
      this.myPokemons[buildId].pokemon.moveIds["slot" + slot] = newMove;
    },
  },
});
