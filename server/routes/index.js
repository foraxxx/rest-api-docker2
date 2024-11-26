import {Router} from "express"
import taskRouter from "./taskRouter.js"
import statusRouter from "./statusRouter.js"

const router = new Router()

router.use('/tasks', taskRouter)
router.use('/statuses', statusRouter)

export default router