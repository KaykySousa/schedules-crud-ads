import { Request, Response } from "express"
import { ScheduleRepository } from "../repositories/ScheduleRepository"
import { HTTPError } from "../errors/HTTPError"

export class SchedulesController {
	async index(req: Request, res: Response) {
		const scheduleRepository = new ScheduleRepository()
		const schedules = await scheduleRepository.findAll()

		res.render("home", {
			schedules: schedules.map((schedule) => ({
				...schedule.dataValues,
				contactDate: schedule.contactDate.toISOString().split("T")[0].split("-").reverse().join("/"),
			})),
		})
	}

	async create(req: Request, res: Response) {
		res.render("create")
	}

	async edit(req: Request, res: Response) {
		const { id } = req.params

		const scheduleRepository = new ScheduleRepository()
		const schedule = await scheduleRepository.findById(Number(id))

		if (!schedule) {
			throw new HTTPError("Schedule not found", 404)
		}

		console.log(schedule)

		res.render("update", {
			...schedule.dataValues,
			contactDate: schedule.contactDate.toISOString().split("T")[0],
		})
	}

	async store(req: Request, res: Response) {
		const { name, phone, phoneType, contactDate, observations } = req.body

		if (!name || !phone || !phoneType || !contactDate) {
			const missingParameters = []
			if (!name) missingParameters.push("name")
			if (!phone) missingParameters.push("phone")
			if (!phoneType) missingParameters.push("phoneType")
			if (!contactDate) missingParameters.push("contactDate")

			throw new HTTPError(`Missing parameters: ${missingParameters.join(", ")}`, 400, {
				missingParameters,
			})
		}

		const scheduleRepository = new ScheduleRepository()

		const schedule = await scheduleRepository.create({
			name,
			phone,
			phoneType,
			contactDate,
			observations,
		})

		res.redirect("/")
	}

	async update(req: Request, res: Response) {
		const { id } = req.params
		const { name, phone, phoneType, contactDate, observations } = req.body

		const scheduleRepository = new ScheduleRepository()
		const schedule = await scheduleRepository.findById(Number(id))

		if (!schedule) {
			throw new HTTPError("Schedule not found", 404)
		}

		await scheduleRepository.update(Number(id), {
			name,
			phone,
			phoneType,
			contactDate,
			observations,
		})

		res.redirect("/")
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params

		const scheduleRepository = new ScheduleRepository()
		await scheduleRepository.delete(Number(id))

		res.redirect("/")
	}
}
