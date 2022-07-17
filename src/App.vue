<template>
  <v-app>
    <todo-form ref="todoDialog" />
    <v-app-bar app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <span style="cursor: pointer" @click="$router.push('/').catch(() => {})">TODOS</span>
      <v-spacer></v-spacer>
      <v-btn plain fab small title="Add todo" @click="$refs.todoDialog.open()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <left-nav-menu :drawer="drawer" @closeDrawer="drawer = false" />
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar v-model="snackbar.show" :timeout="1500" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import LeftNavMenu from './components/LeftNavMenu.vue'
import TodoForm from './components/TodoForm.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: { LeftNavMenu, TodoForm },
  name: 'App',
  data() {
    return {
      drawer: this.$vuetify.breakpoint.lgAndUp,
    }
  },
  methods: {
    ...mapMutations(['SET_TODOS']),
  },
  created() {
    const storredTodos = JSON.parse(localStorage.getItem('todos'))
    if (storredTodos) {
      this.SET_TODOS(storredTodos)
    }
  },
  computed: {
    ...mapGetters(['snackbar']),
  },
}
</script>
