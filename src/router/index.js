import { createRouter, createWebHistory } from 'vue-router'
import ReferencePicker from '../pages/ReferencePicker.vue'

const routes = [
  { path: '/', component: ReferencePicker }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
