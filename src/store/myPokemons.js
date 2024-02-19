import { defineStore } from "pinia";

export const useMyPokemonsStore = defineStore("myPokemons", {
  state: () => ({
    myPokemons: [
      {
        id: 0,
        pid: 445,
        name: "garchomp",
        level: 50,
        nature: "adamant",
        evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        item: "Choice Band",
        abilityId: 0,
        moveIds: { slot1: 1, slot2: 2, slot3: 3, slot4: 4 },
        moves: {
          slot1: "dragon-claw",
          slot2: "earthquake",
          slot3: "fire-blast",
          slot4: "stone-edge",
        },
      },
      {
        id: 1,
        pid: 488,
        name: "cresselia",
        level: 50,
        nature: "bold",
        evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        item: "Choice Scarf",
        abilityId: 0,
        moveIds: { slot1: 7, slot2: 2, slot3: 3, slot4: 4 },
        moves: {
          slot1: "dragon-claw",
          slot2: "earthquake",
          slot3: "fire-blast",
          slot4: "stone-edge",
        },
        statusRank: { atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
      },
    ],
  }),
  actions: {},
});
