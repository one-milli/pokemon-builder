import { defineStore } from "pinia";

export const useEnemyPokemonsStore = defineStore("enemyPokemons", {
  state: () => ({
    enemyPokemons: [
      {
        enemyId: 1,
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
        enemyId: 2,
        pokemon: {
          name: "クレセリア",
          level: 50,
          status: [
            { label: "H", base: 120, ev: 252, iv: 31 },
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
          statusRank: {
            A: 0,
            B: 1,
            C: 0,
            D: 0,
            S: 0,
          },
        },
      },
    ],
  }),
});
