import { createRouter, createWebHistory } from 'vue-router'
import ReferencePicker from '@/pages/ReferencePicker.vue'
import ReferenceViewer from '@/pages/ReferenceViewer.vue'

const routes = [
  {
    path: '/',
    component: ReferencePicker
  },
  {
    path: '/viewer',
    component: ReferenceViewer // ✅ 新增這個 route
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
