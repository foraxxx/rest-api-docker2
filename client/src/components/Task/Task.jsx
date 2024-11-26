import React, {useState} from 'react'
import styles from './Task.module.scss'
import {Button, Dropdown, Space} from "antd"

const Task = (props) => {
  const { text, deadline, taskStatus, menu, deleteTask } = props

  return (
    <div className={styles.task}>
      <h3 className={styles.task__title}>{text}</h3>
      <p>Выполнить до: {deadline}</p>
      <div className={styles.task__actions}>
        <p>{taskStatus}</p>
        <Dropdown
          menu={menu}
          placement="bottom"
          // disabled={taskStatus === 'Выполнено'}
        >
          <Button>
            Статус
          </Button>
        </Dropdown>
        <button className={styles.task__deleteButton} onClick={deleteTask}>
          <img className="" src="../../../public/delete.svg" alt="Удалить" loading="lazy"/>
        </button>
      </div>
    </div>
  )
}

export default Task