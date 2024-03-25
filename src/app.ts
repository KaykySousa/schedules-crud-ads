import bodyParser from "body-parser"
import express from "express"
import { engine as handlebars } from "express-handlebars"
import { scheduleRouter } from "./routes/schedule.routes"
import { errorHandler } from "./utils/errorHandler"

export const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + "/styles"))

app.engine("hbs", handlebars({ extname: "hbs" }))
app.set("view engine", "hbs")
app.set("views", __dirname + "/views")

app.use(scheduleRouter)

app.use(errorHandler)

app.use("*", (req, res) => {
	res.render("error")
})
