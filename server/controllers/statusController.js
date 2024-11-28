import { TaskStatus } from '../models/models.js'

class StatusController {
  async create(req, res) {
    const { name } = req.body
    console.log(name)
    const isStatusExist = await TaskStatus.findOne({where: {name}})

    if (isStatusExist) {
      return res.status(409).json({message: 'Такой статус уже существует'})
    }

    const status = await TaskStatus.create({name})

    return res.status(200).json({status: status, message: 'Статус успешно создан' })
  }

  async getAll(req, res) {
    const allStatuses = await TaskStatus.findAll()

    return res.json(allStatuses)
  }

  async delete(req, res) {

  }
}

export default new StatusController()