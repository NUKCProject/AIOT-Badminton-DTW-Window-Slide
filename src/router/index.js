import { createRouter, createWebHistory } from 'vue-router'
import ReferencePicker from '@/pages/ReferencePicker.vue'
import ReferenceViewer from '@/pages/ReferenceViewer.vue'
import TrainingRawViewer from '@/pages/TrainingRawViewer.vue'
import TrainingViewer from '@/pages/TrainingViewer.vue'

const routes = [
  {
    path: '/',
    component: ReferencePicker
  },
  {
    path: '/reference_viewer',
    component: ReferenceViewer // ✅ 新增這個 route
  },
  {
    path: '/training_raw_viewer',
    component: TrainingRawViewer // ✅ 新增這個 route
  },
  {
    path: '/training_viewer',
    component: TrainingViewer // ✅ 新增這個 route
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
