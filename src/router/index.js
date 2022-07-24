import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/merch',
    name: 'Merch',
    component: () => import('../views/Merch.vue'),
  },
  {
    path: '/todos/:uid',
    name: 'Todo',
    component: () => import('../views/Todo.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'Todo') {
//     const todos = JSON.parse(localStorage.getItem('todos'))
//     const findedTodo = todos?.find(t => t.uid === +to.params.uid)
//     if (!findedTodo) {
//       next({ name: 'Home' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
