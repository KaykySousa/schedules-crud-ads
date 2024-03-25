import { CreationAttributes } from "sequelize"
import { Schedule } from "../models/Schedule"

export class ScheduleRepository {
	async create({ contactDate, name, observations, phone, phoneType }: CreationAttributes<Schedule>) {
		return await Schedule.create({ contactDate, name, observations, phone, phoneType })
	}

	async findAll() {
		return await Schedule.findAll()
	}

	async findById(id: number) {
		return await Schedule.findByPk(id)
	}

	async delete(id: number) {
		const deleted = await Schedule.destroy({
			where: {
				id,
			},
		})

		return !!deleted
	}

	async update(
		id: number,
		{ contactDate, name, observations, phone, phoneType }: CreationAttributes<Schedule>
	) {
		const updated = await Schedule.update(
			{ contactDate, name, observations, phone, phoneType },
			{
				where: {
					id,
				},
			}
		)

		return !!updated[0]
	}
}
