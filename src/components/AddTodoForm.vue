<template>
  <v-form class="elevation-20" v-model="valid">
    <v-row>
      <v-col cols="3">
        <v-text-field
          clearable
          outlined
          v-model="name"
          :counter="10"
          :rules="rules.nameRules"
          label="Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="8">
        <v-textarea
          clearable
          outlined
          rows="1"
          label="Description"
          v-model="description"
          :rules="rules.descrRules"
          counter="255"
        ></v-textarea>
      </v-col>
      <v-col cols="1">
        <v-btn x-large block color="success" :disabled="!valid" @click="save()">SAVE</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddTodoForm',
  data: () => {
    return {
      name: '',
      description: '',
      rules: {
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        descrRules: [
          v => !!v || 'Description is required',
          v => (v && v.length <= 10) || 'Description must be less than 255 characters',
        ],
      },
      valid: false,
    }
  },
  methods: {
    ...mapActions(['ADD_TODO']),
    ...mapMutations(['SET_SNACKBAR']),
    save() {
      try {
        this.ADD_TODO({ name: this.name, description: this.description })
        this.SET_SNACKBAR({ show: true, text: 'SUCCESS', color: 'green darken-4' })
        console.log(this.todos)
      } catch (error) {
        this.SET_SNACKBAR({ show: true, text: 'ERROR', color: 'red accent-4' })
      }
    },
  },
  computed: {
    ...mapGetters(['todos']),
  },
}
</script>
