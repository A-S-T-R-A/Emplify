const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())

app.post("/send-data", (req, res) => {
    const data = req.body
    console.log("Received data from client:", data)
    res.send("Data received successfully!")
})

// Обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
