import { TaskStatus } from '../models/models.js'

class StatusController {
  async create(req, res) {
    const { name } = req.body
    const status = await TaskStatus.create({name})

    return res.json(status)
  }

  async getAll(req, res) {
    const allStatuses = await TaskStatus.findAll()

    return res.json(allStatuses)
  }

  async delete(req, res) {

  }
}

export default new StatusController()