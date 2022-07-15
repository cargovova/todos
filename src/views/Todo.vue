<template>
  <v-card min-height="400px" class="ma-2">
    <delete-todo-dialog ref="deleteTodoDialog" />
    <todo-form ref="todoDialog" />
    <v-card-title>
      <span v-html="todo.name"></span>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small plain fab v-bind="attrs" v-on="on">
            <v-icon v-bind="attrs" v-on="on"> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="$refs.deleteTodoDialog.open(todo.uid)">
            <v-list-item-title> DELETE </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$refs.todoDialog.open(todo)">
            <v-list-item-title> EDIT </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider />
    <v-card-text v-html="todo.description"></v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import DeleteTodoDialog from '../components/DeleteTodoDialog.vue'
import TodoForm from '../components/TodoForm.vue'

export default {
  name: 'Todo',
  components: {
    DeleteTodoDialog,
    TodoForm,
  },
  computed: {
    ...mapGetters(['todos']),
    todo() {
      return this.todos.find(t => t.uid === +this.$route.params.uid)
    },
  },
}
</script>
