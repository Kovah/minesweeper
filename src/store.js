import Vue from 'vue';
import Vuex from 'vuex';

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
        x: 10,
        y: 10
      },
      mineCount: 15
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
