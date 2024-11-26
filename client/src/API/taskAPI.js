import axios from "axios"
import {$host} from "./index.js"

export const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/tasks', {
      proxy: {
        host: 'localhost',
        port: 7000
      }
    })

    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error)
    throw error;
  }
}

export const deleteOneTask = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:7000/api/tasks/${id}`)
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error)
    throw error;
  }
}

export const updateTask = async (taskId, statusId) => {
  try {
    const response = await axios.put(`http://localhost:7000/api/tasks/${taskId}`, { statusId })
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error)
    throw error;
  }
}

export const createOneTask = async (text, date) => {
  try {
    const response = await axios.post(`http://localhost:7000/api/tasks`,  {
      text: text, deadline: date
    } )
    return response.data;
  } catch(error) {
    console.error('Ошибка при создании задачи:', error)
    throw error;
  }
}