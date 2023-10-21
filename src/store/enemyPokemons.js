import { defineStore } from "pinia";

export const useEnemyPokemonsStore = defineStore("enemyPokemons", {
  state: () => ({
    enemyPokemons: [
      {
        id: 0,
        pokemon: {
          id: 488,
          name: "クレセリア",
          level: 50,
          status: [
            { label: "H", calc: 0, base: 120, ev: 0, iv: 31 },
            { label: "A", calc: 0, base: 70, ev: 0, iv: 31 },
            { label: "B", calc: 0, base: 110, ev: 0, iv: 31 },
            { label: "C", calc: 0, base: 75, ev: 0, iv: 31 },
            { label: "D", calc: 0, base: 120, ev: 0, iv: 31 },
            { label: "S", calc: 0, base: 85, ev: 0, iv: 31 },
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
          statusRank: {
            A: 0,
            B: 1,
            C: 0,
            D: 0,
            S: 0,
          },
        },
      },
      {
        id: 1,
        pokemon: {
          id: 149,
          name: "カイリュー",
          level: 50,
          status: [
            { label: "H", calc: 0, base: 91, ev: 252, iv: 31 },
            { label: "A", calc: 0, base: 134, ev: 192, iv: 31 },
            { label: "B", calc: 0, base: 95, ev: 0, iv: 31 },
            { label: "C", calc: 0, base: 100, ev: 0, iv: 31 },
            { label: "D", calc: 0, base: 100, ev: 0, iv: 31 },
            { label: "S", calc: 0, base: 80, ev: 0, iv: 31 },
          ],
          abilities: [
            { label: "せいしんりょく", type: 0 },
            { label: "マルチスケイル", type: 1 },
          ],
          selectedAbility: { label: "マルチスケイル", type: 1 },
          selectedItem: {
            label: "こだわりハチマキ",
            status: ["A"],
            boost: 1.5,
            conditionId: 1,
          },
          selectedNature: { label: "ずぶとい", boost: "B", drop: "A" },
          moveIds: { slot1: 1, slot2: 2, slot3: 3, slot4: 4 },
          statusRank: {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            S: 0,
          },
        },
      },
      {
        id: 2,
        pokemon: {
          id: 500,
          name: "エンブオー",
          level: 50,
          status: [
            { label: "H", calc: 0, base: 110, ev: 252, iv: 31 },
            { label: "A", calc: 0, base: 123, ev: 192, iv: 31 },
            { label: "B", calc: 0, base: 65, ev: 0, iv: 31 },
            { label: "C", calc: 0, base: 100, ev: 0, iv: 31 },
            { label: "D", calc: 0, base: 65, ev: 0, iv: 31 },
            { label: "S", calc: 0, base: 65, ev: 0, iv: 31 },
          ],
          abilities: [
            { label: "もうか", type: 1 },
            { label: "すてみ", type: 1 },
          ],
          selectedAbility: { label: "すてみ", type: 1 },
          selectedItem: {
            label: "こだわりハチマキ",
            status: ["A"],
            boost: 1.5,
            conditionId: 1,
          },
          selectedNature: { label: "ずぶとい", boost: "B", drop: "A" },
          moveIds: { slot1: 8, slot2: 9, slot3: 10, slot4: 1 },
          statusRank: {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            S: 0,
          },
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
    updateStatus(id) {
      this.enemyPokemons[id].pokemon.status.forEach((status) => {
        status.calc = this.calcStatus(
          status.label,
          status.base,
          status.ev,
          status.iv,
          this.enemyPokemons[id].pokemon.level,
          this.enemyPokemons[id].pokemon.selectedNature
        );
      });
    },
    handleChangeMove(newMove, slot, id) {
      this.enemyPokemons[id].pokemon.moveIds["slot" + slot] = newMove;
    },
  },
});
