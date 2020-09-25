import Vue from 'vue';
import Vuex from 'vuex';
import { revealFreeFields } from './lib/helper';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    standards: {
      fieldSize: {
        x: 10,
        y: 10
      },
      mineCount: 15
    },
    settings: {
      fieldSize: {
        x: 5,
        y: 5
      },
      mineCount: 5
    },
    game: {
      gameInitActive: false,
      mines: [],
      fields: [],
      clicks: 0
    }
  },
  mutations: {
    setGameInitState (state, isActive) {
      state.game.gameInitActive = isActive;
    },

    resetGame (state) {
      state.game.mines = [];
      state.game.fields = [];
    },

    addNewMine (state, mineData) {
      state.game.mines.push(mineData);
    },

    addNewField (state, fieldData) {
      state.game.fields.push(fieldData);
    },

    revealedField (state, field) {
      revealFreeFields(field);
    },

    incrementClicks (state) {
      state.game.clicks++;
    }
  },
  getters: {
    mines (state) {
      return state.game.mines;
    },
    fields (state) {
      return state.game.fields;
    }
  }
});
