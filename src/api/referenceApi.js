import axios from 'axios'

// 這邊設定你的後端BaseURL
const apiClient = axios.create({
  baseURL: 'https://badminton-461016.de.r.appspot.com',
  // baseURL: 'http://localhost:8000',
  timeout: 600000,
})

/// Fetch reference waveforms
export const fetchReferenceWindows = async (action, device_id) => {
  const response = await apiClient.get('/extract-reference', {
    params: {
      action,
      device_id
    }
  })
  return response.data
}

// Fetch training waveforms
export const insertReference = async (data) => {
  const response = await apiClient.post('/insert-reference', data)
  return response.data
}

// Fetch training waveforms
export const fetchReferenceWaveforms = async (action) => {
  const response = await apiClient.get('/reference-waveforms', {
    params: {
      action
    }
  })
  return response.data
}

// Fetch training waveforms
export const fetchTrainingWaveforms = async (action) => {
  const response = await apiClient.get('/training-waveforms', {
    params: {
      action,
    }
  })
  return response.data
}

// Fetch training raw waveforms
export const fetchTrainingRawWaveforms = async (action, device_id) => {
  const response = await apiClient.get('/extract-training', {
    params: {
      action,
      device_id
    }
  })
  return response.data
}

// Fetch training raw waveforms
export const fetchAutoLabel = async (action, device_id) => {
  const response = await apiClient.post('/auto-label', null, {
    params: {
      action: action,
      device_id: device_id
    }
  })
  return response.data
}

// Fetch auto label peaks
export const fetchAutoLabelPeaks = async (action, device_id) => {
  const response = await apiClient.post('/auto-label-peaks', null, {
    params: {
      action: action,
      device_id: device_id
    }
  })
  return response.data
}