import {Task, TaskStatus} from "../models/models.js"

class TaskController {
  async create (req, res) {
    try {
      const { text, deadline } = req.body
      const status = await TaskStatus.findOne({where: {name: 'В процессе'}})
      const task = await Task.create({text, deadline, TaskStatusId: status.id})

      return res.json({status: status.name, task: task, message: 'Задача успешно создана'})
    } catch(error) {
      return res.status(400).send(error)
    }
  }

  async getAll (req, res) {
    const tasks = await Task.findAll(
      {
        include: {
          model: TaskStatus,
          as: 'status',
          attributes: ['name'],
        }
      }
    )

    return res.json(tasks)
  }

  async update (req, res) {
    try {
      const { id } = req.params
      const { statusId } = req.body

      const task = await Task.findOne({where:{id}})

      task.TaskStatusId = statusId
      await task.save()

      const updatedStatus = await TaskStatus.findOne({ where: { id: statusId } });

      return res.json({status:updatedStatus.name, task: task, message: 'Задача успешно обновлена'})
    } catch(error) {
      return res.status(500).json({message: 'Ошибка при изменении задачи'})
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const deleted = await Task.destroy({where: {id}})

      if (deleted > 0) {
        return res.json({message: 'Задача успешно удалена'})
      } else {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
    } catch(error) {
        return res.status(500).json({ message: 'Ошибка при удалении задачи' })
    }
  }
}

export default new TaskController();