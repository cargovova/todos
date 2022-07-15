<template>
  <v-dialog @click:outside="close" width="400" v-model="showDialog">
    <v-card class="pa-6">
      <v-card-title class="flex justify-center"> Are you sure?</v-card-title>
      <v-divider />
      <v-card-actions class="d-flex justify-space-around mt-6">
        <v-btn color="error" @click="deleteTodo">CONFIRM</v-btn>
        <v-btn @click="close">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'DeleteTodoDialog',
  data() {
    return {
      showDialog: false,
      todoId: null,
    }
  },
  methods: {
    ...mapActions(['DELETE_TODO']),
    ...mapMutations(['SET_SNACKBAR']),
    deleteTodo() {
      try {
        this.DELETE_TODO(this.todoId)
        this.SET_SNACKBAR({ show: true, text: 'SUCCESS', color: 'green darken-4' })
      } catch (error) {
        this.SET_SNACKBAR({ show: true, text: 'ERROR', color: 'red accent-4' })
      }
      this.close()
      this.$router.push({ name: 'Home' }).catch(() => {})
    },
    open(id) {
      this.todoId = id
      this.showDialog = true
    },
    close() {
      this.todoId = null
      this.showDialog = false
    },
  },
}
</script>
