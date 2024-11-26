import {Router} from "express"
import TaskController from "../controllers/taskController.js"

const router = new Router()

router.post('/', TaskController.create)
router.get('/', TaskController.getAll)
router.put('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

export default router