<template>
  <v-navigation-drawer app clipped v-model="localDrawer" disable-resize-watcher>
    <v-list>
      <v-list-item exact link to="/merch">
        <v-list-item-content>
          <v-list-item-title class="text-left green--text">MERCH</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item exact link :to="'/todos/' + todo.uid" v-for="(todo, i) in todos" :key="i">
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
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      localDrawer: this.drawer,
    }
  },
  watch: {
    drawer: function () {
      this.localDrawer = this.drawer
    },
    localDrawer: function () {
      if (!this.localDrawer) {
        this.$emit('closeDrawer', this.localDrawer)
      }
    },
  },
  computed: {
    ...mapGetters(['todos']),
  },
}
</script>
