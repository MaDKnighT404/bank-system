import axios from "axios";
import error from "@/utils/error";
const TOKEN_KEY = "jwt-token";

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY) || null,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state, token) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      console.log(payload); // payload - данные из формы

      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true });
        console.log(data.idToken);
        commit("setToken", data.idToken);
        commit("clearMessage", null, { root: true });
      } catch (e) {
        // console.log("Error:", error.response.data.error.message);
        dispatch(
          "setMessage",
          {
            value: error(e.response.data.error.message),
            type: "danger",
          },
          { root: true } // обращаемся к глобальному стейту, а не к auth
        );
        console.log(error(e.response.data.error.message));
        throw new Error();
      }
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(_, getters) {
      return !!getters.token;
    },
  },
};
