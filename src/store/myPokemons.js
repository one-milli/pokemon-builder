import { defineStore } from "pinia";

export const useMyPokemonsStore = defineStore("myPokemons", {
  state: () => ({
    myPokemons: [
      {
        id: 0,
        pokemon: {
          pid: 445,
          name: "garchomp",
          level: 50,
          nature: "adamant",
          evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          item: "choice band",
          abilityId: 0,
          moveIds: { slot1: 1, slot2: 2, slot3: 3, slot4: 4 },
          moves: {
            slot1: "dragon claw",
            slot2: "earthquake",
            slot3: "fire blast",
            slot4: "stone edge",
          },
        },
      },
      {
        id: 1,
        pokemon: {
          pid: 488,
          name: "cresselia",
          level: 50,
          nature: "bold",
          evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          item: "choice scarf",
          abilityId: 0,
          moveIds: { slot1: 7, slot2: 2, slot3: 3, slot4: 4 },
          moves: {
            slot1: "dragon claw",
            slot2: "earthquake",
            slot3: "fire blast",
            slot4: "stone edge",
          },
          statusRank: { atk: 0, def: 1, spa: 0, spd: 0, spe: 0 },
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
    updateStatus(id) {},
    handleChangeMove(newMove, slot, id) {
      this.myPokemons[id].pokemon.moveIds["slot" + slot] = newMove;
    },
  },
});
