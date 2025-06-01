<script setup>
import { ref } from 'vue'
import { fetchTrainingWaveforms } from '@/api/referenceApi'
import WaveformCard from '@/components/WaveformCard.vue'

// 可選的動作清單（你可以自己加）
const actionOptions = ['smash', 'drive', 'clear', 'drop', 'toss']

const actionType = ref('smash')   // 預設 smash
const waveforms = ref([])
// 當勾選發生時，如果沒有 speed，就初始化一個欄位




// 載入資料
const loadTrainingWaveforms = async () => {
    try {
        const data = await fetchTrainingWaveforms(actionType.value)
        waveforms.value = data
    } catch (error) {
        console.error('載入小段資料失敗', error)
    }
}

// 一進來就先自動載一次
// loadTrainingWaveforms()
</script>

<template>
    <div>
        <h1>Training Viewer</h1>

        <div class="toolbar">
            <label>選擇動作：</label>
            <select v-model="actionType">
                <option v-for="action in actionOptions" :key="action" :value="action">{{ action }}</option>
            </select>

            <button @click="loadTrainingWaveforms">載入資料</button>
           
        </div>

        <div v-if="waveforms.length === 0">
            <p>目前沒有訓練波形</p>
        </div>

        <div v-else>
            <div v-for="(waveform, index) in waveforms" :key="index" class="mb-4 border p-2 rounded-md shadow">
                <WaveformCard :waveform="waveform.waveform" :index="index" />
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
