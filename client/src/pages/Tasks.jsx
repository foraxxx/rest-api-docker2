import React, {useEffect, useState} from 'react'
import {createOneTask, deleteOneTask, fetchTasks, updateTask} from "../API/taskAPI.js"
import Task from "../components/Task/Task.jsx"
import Layout from "../components/layout/Layout.jsx"
import {fetchStatuses} from "../API/statusAPI.js"
import {Button, Cascader, ConfigProvider, DatePicker, Form, Input, message, Segmented} from "antd"
import dayjs from "dayjs"



const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [statuses, setStatuses] = useState([])
  const [error, setError] = useState(null)
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  const changeStatus = async (taskId, selectedStatus) => {
    try {
      const {status, task: updatedTask, message: mess } = await updateTask(taskId, selectedStatus)

      const newTask = {
        ...updatedTask,
        status: {name: status}
      }

      setTasks(prevTasks => prevTasks.map(task =>
        task.id === newTask.id ? newTask : task
      ));

      message.success(mess);
    } catch(error) {
      const errorMessage = error.response?.data?.message || 'Ошибка при изменении задачи';
      message.error(errorMessage);
    }
  }

  const createMenu = (taskId) => ({
    items: statuses.map(status => ({
      key: status.id.toString(),
      label: status.label
    })),
    onClick: (e) => {
      const selectedStatus = statuses.find(status => status.id === parseInt(e.key, 10));
      changeStatus(taskId, e.key)
    }
  })

  // const menu = {
  //   items: statuses.map(status => ({
  //     key: status.id,
  //     label: status.label
  //   })),
  //   onClick: changeStatus
  // }

  useEffect(() => {
    const loadData = async () => {
      try {
        const tasksData = await fetchTasks()
        const statusesData = await fetchStatuses()

        const statusItems = statusesData.map(status => ({
          id: status.id.toString(),
          label: status.name,
        }))

        setTasks(tasksData)
        setStatuses(statusItems)
      } catch(error) {
        setError('Ошибка при загрузке задач')
      }
    }

    loadData()
  }, [])

  const deleteTask = async (taskId) => {
    try {
      const deletedTask = await deleteOneTask(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
      message.success(deletedTask.message);
    } catch(error) {
      const errorMessage = error.response?.data?.message || 'Ошибка при удалении задачи';
      message.error(errorMessage);
    }
  }

  const createTask = async (values) => {
    try {
      const { text, deadline } = values
      const date = dayjs(deadline).format('YYYY-MM-DD');

      const createdTask = await createOneTask(text, date)

      const newTask = {
        ...createdTask.task,
        status: {name: createdTask.status},
      }

      console.log(newTask)

      setTasks((prevTasks) => [...prevTasks, newTask])
      message.success(createdTask.message);
      form.resetFields();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ошибка при добавлении задачи';
      message.error(errorMessage);
    }
  }

  const disablePastDates = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <div className="container">
      <Form
        onFinish={createTask}
        form={form}
        style={{
          maxWidth: 500,
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Form.Item
          name="text"
          rules={[
            {
              required: true,
              message: 'Укажите название',
            },
          ]}
        >
          <Input placeholder="Название задачи"/>
        </Form.Item>
        <Form.Item
          name="deadline"
          rules={[
            {
              required: true,
              message: 'Укажите срок выполнения!',
            },
          ]}
        >
          <DatePicker disabledDate={disablePastDates} placeholder="Срок выполнения"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Создать
          </Button>
        </Form.Item>
      </Form>
      <Layout>
        {tasks.map((task) => {
          return (
            <Task key={task.id}
                  text={task?.text}
                  deadline={task?.deadline}
                  taskStatus={task?.status?.name}
                  menu={createMenu(task.id)}
                  deleteTask={() => deleteTask(task.id)}
            />
          )
        })}
      </Layout>
    </div>
  )
}

export default Tasks