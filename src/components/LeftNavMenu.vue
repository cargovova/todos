<template>
  <v-navigation-drawer app clipped>
    <v-list>
      <v-list-item exact link :to="'/' + todo.uid" v-for="(todo, i) in todos" :key="i">
        <v-list-item-content>
          <v-list-item-title class="text-left">{{ todo.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LeftNavMenu',
  computed: {
    ...mapGetters(['todos']),
  },
}
</script>
