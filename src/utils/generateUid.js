import store from '../store'

const MAX_VALUE = 10000
const MIN_VALUE = 1

let id = null

const generateUid = () => {
  id = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE
  const findedTodo = store.getters.todos.find(todo => todo.uid === id)
  if (findedTodo) {
    generateUid()
  }
  return id
}

export { generateUid }
