import { defineStore } from "pinia";

export const useEnemyPokemonsStore = defineStore("enemyPokemons", {
  state: () => ({
    enemyPokemons: [
      {
        id: 0,
        pokemon: {
          pid: 488,
          name: "cresselia",
          level: 50,
          nature: "bold",
          evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 4, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          item: "Assault Vest",
          abilityId: 0,
          moves: {
            slot1: "moonblast",
            slot2: "psychic",
            slot3: "ice-beam",
            slot4: "thunder",
          },
        },
      },
      {
        id: 1,
        pokemon: {
          pid: 149,
          name: "dragonite",
          level: 50,
          nature: "jolly",
          evs: { hp: 252, atk: 252, def: 0, spa: 0, spd: 0, spe: 4 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          item: "Choice Band",
          abilityId: 0,
          moves: {
            slot1: "dragon-claw",
            slot2: "earthquake",
            slot3: "extreme-speed",
            slot4: "fire-punch",
          },
        },
      },
      {
        id: 2,
        pokemon: {
          pid: 500,
          name: "emboar",
          level: 50,
          nature: "timid",
          evs: { hp: 144, atk: 0, def: 60, spa: 252, spd: 0, spe: 52 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          item: "Choice Specs",
          abilityId: 0,
          moves: {
            slot1: "heat-crash",
            slot2: "earthquake",
            slot3: "fire-blast",
            slot4: "low-kick",
          },
        },
      },
      {
        id: 3,
        pokemon: {
          pid: 908,
          name: "meowscarada",
          level: 50,
          nature: "adamant",
          evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          item: "Choice Scarf",
          abilityId: 0,
          moves: {
            slot1: "flower-trick",
            slot2: "play-rough",
            slot3: "knock-off",
            slot4: "night-slash",
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
    handleAddPokemon(pid, pokemon_name) {
      const newPokemon = {
        id: this.enemyPokemons.length,
        pokemon: {
          pid: pid,
          name: pokemon_name,
          level: 50,
          nature: "adamant",
          evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
          item: "Life Orb",
          abilityId: 0,
          moves: {
            slot1: "",
            slot2: "",
            slot3: "",
            slot4: "",
          },
        },
      };
      this.enemyPokemons.push(newPokemon);
    },
    handleDeletePokemon(id) {
      const deleteIndex = this.enemyPokemons.findIndex(
        (pokemon) => pokemon.id === id
      );
      this.enemyPokemons.splice(deleteIndex, 1);
    },
  },
});
