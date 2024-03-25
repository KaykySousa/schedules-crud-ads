import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../database/sequelize"

export class Schedule extends Model<InferAttributes<Schedule>, InferCreationAttributes<Schedule>> {
	declare id: CreationOptional<number>
	declare name: string
	declare phone: string
	declare phoneType: string
	declare contactDate: Date
	declare observations: string
}

Schedule.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phoneType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contactDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		observations: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "Schedule",
		tableName: "schedules",
	}
)
