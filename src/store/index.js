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
    PUSH_TODO_AS_FIRST(state, todo) {
      state.todos.unshift(todo)
    },
    DELETE_SINGLE_TODO(state, index) {
      state.todos.splice(index, 1)
    },
    UPDATE_SINGLE_TODO(state, payload) {
      state.todos.splice(payload.index, 1, payload.todo)
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar
    },
  },
  actions: {
    ADD_TODO({ commit, state }, todo) {
      commit('PUSH_TODO_AS_FIRST', todo)
      console.log(state.todos)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    DELETE_TODO({ commit, state }, uid) {
      const findedIndex = state.todos.findIndex(t => t.uid === +uid)
      commit('DELETE_SINGLE_TODO', findedIndex)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    UPDATE_TODO({ commit, state }, todo) {
      const findedIndex = state.todos.findIndex(t => t.uid === +todo.uid)
      commit('UPDATE_SINGLE_TODO', { index: findedIndex, todo })
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
  },
  getters: {
    todos: s => s.todos,
    snackbar: s => s.snackbar,
  },
})
