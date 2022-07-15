<template>
  <v-card>
    <v-card-title>
      <span v-html="todo.name"></span> <v-spacer /> <v-btn small plain fab><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text v-html="todo.description"></v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Todo',
  computed: {
    ...mapGetters(['todos']),
    todo() {
      return this.todos.find(t => t.uid === +this.$route.params.uid)
    },
  },
}
</script>
