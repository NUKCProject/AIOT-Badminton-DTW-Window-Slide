import axios from 'axios'

// 這邊設定你的後端BaseURL
const apiClient = axios.create({
  // baseURL: 'https://badminton-457613.de.r.appspot.com',
  baseURL: 'http://127.0.0.1:8000',
  timeout: 60000,
})

// 抓小段waveform
export const fetchReferenceWindows = async (action, device_id) => {
  const response = await apiClient.get('/extract-reference', {
    params: {
      action,
      device_id
    }
  })
  return response.data
}

// 抓大段waveform
export const insertReference = async (data) => {
  const response = await apiClient.post('/insert-reference', data)
  return response.data
}

// 抓代表waveform
export const fetchReferenceWaveforms = async (action) => {
  const response = await apiClient.get('/reference-waveforms', {
    params: {
      action
    }
  })
  return response.data
}

export const fetchTrainingWaveforms = async (action) => {
  const response = await apiClient.get('/training-waveforms', {
    params: {
      action,
    }
  })
  return response.data
}

// 抓小段training raw waveform
export const fetchTrainingRawWaveforms = async (action, device_id) => {
  const response = await apiClient.get('/extract-training', {
    params: {
      action,
      device_id
    }
  })
  return response.data
}

// 自動標記Training Raw Waveform
export const fetchAutoLabel = async (action, device_id) => {
  const response = await apiClient.post('/auto-label', null, {
    params: {
      action: action,
      device_id: device_id
    }
  })
  return response.data
}