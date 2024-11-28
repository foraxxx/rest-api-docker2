import axios from "axios"

export const fetchStatuses = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/statuses', {
      proxy: {
        host: 'localhost',
        port: 7000
      }
    })

    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке статусов:', error)
    throw error;
  }
}

export const createOneStatus = async (name) => {
  try {
    const response = await axios.post('http://localhost:7000/api/statuses', {name} )

    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении статуса:', error)
    throw error;
  }
}