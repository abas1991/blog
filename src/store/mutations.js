
const mutations = {

  SET_POSTS(state, payload) {
    state.posts = [...state.posts,...payload];
    state.isFetched = true;
  },

  SET_FILTER(state, payload) {
    state.filter = payload;
  },

  SET_USERS(state, payload) {
    state.users = payload;
  },
  ADD_POST(state, payload) {
    state.posts.unshift(payload);
  },
}

export default mutations;
