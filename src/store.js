import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clicks: 0
  },
  mutations: {
    incrementClicks (state) {
      state.clicks++;
    }
  }
});
