import {Router} from "express"
import StatusController from "../controllers/statusController.js"

const router = new Router()

router.post('/', StatusController.create)
router.get('/', StatusController.getAll)
router.delete('/', StatusController.delete)

export default router