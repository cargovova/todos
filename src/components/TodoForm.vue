<template>
  <v-dialog @click:outside="close" width="600" v-model="showDialog">
    <v-card>
      <v-card-title>{{ titleText }} todo </v-card-title>
      <v-form class="elevation-8 pa-6" v-model="valid" ref="todoDialog">
        <v-text-field
          clearable
          outlined
          v-model="todo.name"
          :counter="15"
          :rules="rules.nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-textarea
          clearable
          outlined
          rows="7"
          label="Description"
          v-model="todo.description"
          :rules="rules.descrRules"
          counter="255"
        ></v-textarea>
        <v-btn x-large block color="success" :disabled="!valid" @click="save()">SAVE</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { generateUid } from '../utils/generateUid'

export default {
  name: 'TodoForm',
  data: () => {
    return {
      todo: { name: '', description: '' },
      rules: {
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters',
        ],
        descrRules: [
          v => !!v || 'Description is required',
          v => (v && v.length <= 255) || 'Description must be less than 255 characters',
        ],
      },
      valid: false,
      showDialog: false,
      titleText: 'Add',
    }
  },
  methods: {
    ...mapActions(['ADD_TODO', 'UPDATE_TODO']),
    ...mapMutations(['SET_SNACKBAR']),
    save() {
      if (this.titleText === 'Add') {
        try {
          const uid = generateUid()
          this.ADD_TODO({ ...this.todo, uid })
          this.SET_SNACKBAR({ show: true, text: 'SUCCESS', color: 'green darken-4' })
          this.$router.push({ name: 'Todo', params: { uid } }).catch(() => {})
        } catch (error) {
          this.SET_SNACKBAR({ show: true, text: 'ERROR', color: 'red accent-4' })
        }
      } else {
        try {
          this.UPDATE_TODO({ ...this.todo })
          this.SET_SNACKBAR({ show: true, text: 'SUCCESS', color: 'green darken-4' })
          this.$router.push({ name: 'Todo', params: { uid: this.todo.uid } }).catch(() => {})
        } catch (error) {
          this.SET_SNACKBAR({ show: true, text: 'ERROR', color: 'red accent-4' })
        }
      }
      this.close()
    },
    open(todoItem) {
      if (todoItem) {
        this.todo = { ...todoItem }
        this.titleText = 'Edit'
      }
      this.showDialog = true
    },
    close() {
      this.$refs.todoDialog.reset()
      this.showDialog = false
    },
  },
  computed: {
    ...mapGetters(['todos']),
  },
}
</script>
