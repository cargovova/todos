<template>
  <div class="pa-6">
    <add-todo-form />
  </div>
</template>

<script>
import AddTodoForm from '../components/AddTodoForm.vue'
export default {
  name: 'Home',
  components: { AddTodoForm },
}
</script>
