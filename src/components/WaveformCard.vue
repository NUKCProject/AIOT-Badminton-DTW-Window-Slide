<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// 這裡正確寫法：props要存到變數上！
const props = defineProps({
  waveform: {
    type: Array,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

// 這裡要加 props.
const timestamps = computed(() => props.waveform.map(p => p.ts))
const ax = computed(() => props.waveform.map(p => p.ax))
const ay = computed(() => props.waveform.map(p => p.ay))
const az = computed(() => props.waveform.map(p => p.az))
const gx = computed(() => props.waveform.map(p => p.gx))
const gy = computed(() => props.waveform.map(p => p.gy))
const gz = computed(() => props.waveform.map(p => p.gz))

const magnitude = computed(() => 
  props.waveform.map(p => Math.sqrt(p.ax ** 2 + p.ay ** 2 + p.az ** 2))
)

const sixAxisData = computed(() => ({
  labels: timestamps.value,
  datasets: [
    { label: 'ax', data: ax.value, borderColor: 'red', fill: false },
    { label: 'ay', data: ay.value, borderColor: 'blue', fill: false },
    { label: 'az', data: az.value, borderColor: 'green', fill: false },
    { label: 'gx', data: gx.value, borderColor: 'purple', fill: false },
    { label: 'gy', data: gy.value, borderColor: 'orange', fill: false },
    { label: 'gz', data: gz.value, borderColor: 'cyan', fill: false }
  ]
}))

const magnitudeData = computed(() => ({
  labels: timestamps.value,
  datasets: [
    { label: 'Magnitude', data: magnitude.value, borderColor: 'black', fill: false }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Timestamp'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Sensor Value'
      }
    }
  }
}
</script>

<template>
  <div class="waveform-card">
    <h3>小段 #{{ index }}</h3>

    <div class="chart-container" v-if="sixAxisData.labels.length">
      <Line :data="sixAxisData" :options="chartOptions" />
    </div>

    <div class="chart-container" v-if="magnitudeData.labels.length">
      <Line :data="magnitudeData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.waveform-card {
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.chart-container {
  width: 600px;
  height: 400px;
  margin-bottom: 20px;
}
</style>
