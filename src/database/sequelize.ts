import { Sequelize } from "sequelize"

export const sequelize = new Sequelize("mysql://root@localhost:3306/schedules")

sequelize.sync().then(() => console.log("DB synced"))
