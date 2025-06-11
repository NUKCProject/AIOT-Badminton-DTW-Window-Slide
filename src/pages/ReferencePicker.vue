<script setup>
import { ref } from 'vue'
import { fetchReferenceWindows, insertReference } from '@/api/referenceApi'
import WaveformCard from '@/components/WaveformCard.vue'

// 可選的動作清單（你可以自己加）
const actionOptions = ['smash', 'drive', 'clear', 'drop', 'toss']

const actionType = ref('smash')   // 預設 smash
const deviceId = ref('DC39')       // 預設你的裝置ID
const windows = ref([])
const selectedWindows = ref([]);
// 當勾選發生時，如果沒有 speed，就初始化一個欄位
function handleCheck(window) {
    if (!('speed' in window)) {
        window.speed = '';
    }
}

const confirmDialog = ref(null);
// 當選擇的資料改變時，檢查是否有勾選
function openConfirmDialog() {
    confirmDialog.value?.showModal();
}
// 當選擇的資料改變時，檢查是否有勾選
function closeConfirmDialog() {
    confirmDialog.value?.close();
}
// 提交資料
async function submitData() {
    let successCount = 0;
    let failCount = 0;

    for (const data of selectedWindows.value) {
        try {
            const res = await insertReference({
                action: actionType.value,
                waveform: data.waveform,
                speed: data.speed || null,
                raw_id: data.raw_id,
                window_index: data.index
            })
            console.log('送出結果', res);
            if (res.status === 'reference saved') {
                successCount++;
            } else {
                failCount++;
            }
        } catch (err) {
            console.error('送出失敗', err);
            failCount++;
        }
    }

    confirmDialog.value?.close();

    alert(`送出完成 ✅ 成功 ${successCount} 筆，❌ 失敗 ${failCount} 筆`);
    selectedWindows.value = []; // 清空已選資料
}


// 載入資料
const loadReferenceWindows = async () => {
    try {
        const data = await fetchReferenceWindows(actionType.value, deviceId.value)
        if (data.windows) {
            windows.value = data.windows
        }
    } catch (error) {
        console.error('載入小段資料失敗', error)
    }
}

// 一進來就先自動載一次
loadReferenceWindows()
</script>

<template>
    <div>
        <h1>Reference Picker</h1>

        <div class="toolbar">
            <label>選擇動作：</label>
            <select v-model="actionType">
                <option v-for="action in actionOptions" :key="action" :value="action">{{ action }}</option>
            </select>

            <label>輸入Device ID：</label>
            <input v-model="deviceId" placeholder="請輸入裝置ID" />

            <button @click="loadReferenceWindows">載入資料</button>
            <!-- 在畫面底部加入送出按鈕 -->
            <div v-if="selectedWindows.length > 0" class="fixed bottom-4 right-4">
                <button class="bg-blue-600 text-white px-4 py-2 rounded shadow" @click="openConfirmDialog"
                    :disabled="selectedWindows.length === 0">
                    送出選取的代表波形
                </button>
            </div>
        </div>

        <div v-if="windows.length === 0">
            <p>目前沒有可標記的小段資料</p>
        </div>

        <div v-else>
            <div v-for="(window, index) in windows" :key="index" class="mb-4 border p-2 rounded-md shadow">
                <hr>
                <label class="flex items-center space-x-2">
                    <input type="checkbox" :value="window" v-model="selectedWindows" />
                    <span>勾選作為代表波形</span>
                </label>
                <!-- Speed 輸入欄 -->
                <div v-if="selectedWindows.includes(window)" class="mt-2">
                    <label class="block mb-1">Speed（km/h，可選）</label>
                    <input type="number" v-model="window.speed" class="border rounded px-2 py-1 w-full"
                        placeholder="若為 smash 可輸入球速" />
                </div>
                <WaveformCard :waveform="window.waveform" :index="window.index" />
            </div>
        </div>


        <!-- 確認彈窗 -->
        <dialog ref="confirmDialog" class="p-4 rounded border shadow-md w-96">
            <p class="mb-2">你總共勾選了 {{ selectedWindows.length }} 筆代表波形。</p>
            <p class="mb-4">動作類型為：<strong>{{ actionType }}</strong></p>
            <div class="flex justify-end space-x-2">
                <button @click="submitData" class="bg-green-600 text-white px-4 py-1 rounded">確認送出</button>
                <button @click="closeConfirmDialog" class="bg-gray-400 text-white px-4 py-1 rounded">取消</button>
            </div>
        </dialog>
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
