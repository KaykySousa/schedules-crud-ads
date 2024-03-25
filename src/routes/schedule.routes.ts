import { Router } from "express"
import { SchedulesController } from "../controllers/ScheduleController"
import { catchError } from "../utils/catchError"

export const scheduleRouter = Router()

const scheduleController = new SchedulesController()

scheduleRouter.get("/", catchError(scheduleController.index))
scheduleRouter.get("/create", catchError(scheduleController.create))
scheduleRouter.get("/update/:id", catchError(scheduleController.edit))

scheduleRouter.post("/create", catchError(scheduleController.store))
scheduleRouter.post("/update/:id", catchError(scheduleController.update))
scheduleRouter.get("/delete/:id", catchError(scheduleController.delete))
