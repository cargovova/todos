<template>
  <v-card class="my-6" min-height="400px">
    <delete-todo-dialog ref="deleteTodoDialog" />
    <v-card-title>
      <span v-html="todo.name"></span>
      <v-spacer />
      <v-menu offset-y min-width="100" max-width="100">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small plain fab v-bind="attrs" v-on="on">
            <v-icon v-bind="attrs" v-on="on"> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="$refs.deleteTodoDialog.open(todo.uid)">
            <v-list-item-title> DELETE </v-list-item-title>
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

export default {
  name: 'Todo',
  components: {
    DeleteTodoDialog,
  },
  computed: {
    ...mapGetters(['todos']),
    todo() {
      return this.todos.find(t => t.uid === +this.$route.params.uid)
    },
  },
}
</script>
