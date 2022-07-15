import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    snackbar: { show: false, text: '', color: '' },
  },
  mutations: {
    SET_TODOS(state, e) {
      state.todos = e
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar
    },
  },
  actions: {
    ADD_TODO({ commit, state }, todo) {
      const todos = state.todos
      todos.unshift(todo)
      commit('SET_TODOS', todos)
      localStorage.setItem('todos', JSON.stringify({ todos: state.todos }))
    },
  },
  getters: {
    todos: s => s.todos,
    snackbar: s => s.snackbar,
  },
})
