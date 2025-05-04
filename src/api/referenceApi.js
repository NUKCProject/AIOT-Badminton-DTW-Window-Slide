import axios from 'axios'

// 這邊設定你的後端BaseURL
const apiClient = axios.create({
  baseURL: 'https://badminton-457613.de.r.appspot.com',
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

// 之後可以繼續加更多API，比如 insert-reference 等等
