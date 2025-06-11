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

// This component displays a waveform card with three charts: acceleration, gyroscope, and magnitude of acceleration.
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

const timestamps = computed(() => props.waveform.map(p => p.ts))
const ax = computed(() => props.waveform.map(p => p.ax))
const ay = computed(() => props.waveform.map(p => p.ay))
const az = computed(() => props.waveform.map(p => p.az))
const gx = computed(() => props.waveform.map(p => p.gx))
const gy = computed(() => props.waveform.map(p => p.gy))
const gz = computed(() => props.waveform.map(p => p.gz))

// Calculate the magnitude of the acceleration
const magnitude = computed(() => 
  props.waveform.map(p => Math.sqrt(p.ax ** 2 + p.ay ** 2 + p.az ** 2))
)
// Define the data for each chart using computed properties
const accData = computed(() => ({
  labels: timestamps.value,
  datasets: [
    { label: 'ax', data: ax.value, borderColor: 'red', fill: false },
    { label: 'ay', data: ay.value, borderColor: 'blue', fill: false },
    { label: 'az', data: az.value, borderColor: 'green', fill: false }
  ]
}))
// Define the gyroscope data
const gyrData = computed(() => ({
  labels: timestamps.value,
  datasets: [
    { label: 'gx', data: gx.value, borderColor: 'purple', fill: false },
    { label: 'gy', data: gy.value, borderColor: 'orange', fill: false },
    { label: 'gz', data: gz.value, borderColor: 'cyan', fill: false }
  ]
}))
// Define the magnitude data
const magnitudeData = computed(() => ({
  labels: timestamps.value,
  datasets: [
    { label: 'Magnitude', data: magnitude.value, borderColor: 'black', fill: false }
  ]
}))
// Chart options for all charts
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

    <div class="chart-row">
      <div class="chart-container">
        <h4>加速度 (ax, ay, az)</h4>
        <Line :data="accData" :options="chartOptions" />
      </div>
      <div class="chart-container">
        <h4>角速度 (gx, gy, gz)</h4>
        <Line :data="gyrData" :options="chartOptions" />
      </div>
    </div>

    <div class="chart-container">
      <h4>加速度 Magnitude</h4>
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

.chart-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.chart-container {
  width: 500px;
  height: 300px;
  margin-bottom: 20px;
}
</style>
