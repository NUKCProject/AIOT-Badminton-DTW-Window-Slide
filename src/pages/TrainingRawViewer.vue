<script setup>
import { ref } from 'vue'
import { fetchTrainingRawWaveforms, fetchAutoLabel } from '@/api/referenceApi'
import WaveformCard from '@/components/WaveformCard.vue'

// 可選的動作清單（你可以自己加）
const actionOptions = ['smash', 'drive', 'clear', 'drop', 'toss']

const actionType = ref('smash')   // 預設 smash
const deviceId = ref('DC39')       // 預設你的裝置ID
const windows = ref([])

// 載入資料
const loadTrainingWindows = async () => {
    try {
        const data = await fetchTrainingRawWaveforms(actionType.value, deviceId.value)
        if (data.windows) {
            windows.value = data.windows
        }
        else {
            windows.value = []
        }
    } catch (error) {
        console.error('載入原生訓練資料失敗', error)
    }
}

const autoLabel = async () => {
    try {
        const data = await fetchAutoLabel(actionType.value, deviceId.value)
        console.log('自動標記資料', data)
        
    } catch (error) {
        console.error('自動標記資料失敗', error)
    }
}

// 一進來就先自動載一次
loadTrainingWindows()
</script>

<template>
    <div>
        <h1>Training Raw Viewer</h1>

        <div class="toolbar">
            <label>選擇動作：</label>
            <select v-model="actionType">
                <option v-for="action in actionOptions" :key="action" :value="action">{{ action }}</option>
            </select>

            <label>輸入Device ID：</label>
            <input v-model="deviceId" placeholder="請輸入裝置ID" />

            <button @click="loadTrainingWindows">載入資料</button>
            <button @click="autoLabel">自動標記</button>
        </div>

        <div v-if="windows.length === 0">
            <p>目前沒有Training Raw waveforms</p>
        </div>

        <div v-else>
            <div v-for="(window, index) in windows" :key="index" class="mb-4 border p-2 rounded-md shadow">
                <hr>
                <WaveformCard :waveform="window.waveform" :index="window.index" />
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.toolbar {
    position: sticky;
    top: 0;
    background: white;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #ddd;
    z-index: 10;
}

input,
select {
    padding: 5px;
}

button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.window-card {
    padding: 10px;
    border: 1px solid #ccc;
    margin-top: 10px;
}
</style>
