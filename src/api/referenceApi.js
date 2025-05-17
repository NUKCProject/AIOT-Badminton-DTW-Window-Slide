import axios from 'axios'

// 這邊設定你的後端BaseURL
const apiClient = axios.create({
  baseURL: 'https://badminton-457613.de.r.appspot.com',
  // baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
})

// 抓小段waveform
export const fetchReferenceWindows = async (action_type, device_id) => {
  const response = await apiClient.get('/extract-reference', {
    params: {
      action_type,
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

export const fetchReferenceWaveforms = async (action_type) => {
  const response = await apiClient.get('/reference-waveforms', {
    params: {
      action_type
    }
  })
  return response.data
}
