import Vue from 'vue'
import Vuex from 'vuex'
import { generateUid } from '../utils/generateUid'

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
      const uid = generateUid()
      const todos = [...state.todos]
      todos.unshift({ ...todo, uid })
      commit('SET_TODOS', todos)
      localStorage.setItem('todos', JSON.stringify({ todos }))
    },
    DELETE_TODO({ commit, state }, uid) {
      const todos = [...state.todos]
      const findedIndex = todos.findIndex(t => t.uid === +uid)
      todos.splice(findedIndex, 1)
      commit('SET_TODOS', todos)
      localStorage.setItem('todos', JSON.stringify({ todos }))
    },
  },
  getters: {
    todos: s => s.todos,
    snackbar: s => s.snackbar,
  },
})
