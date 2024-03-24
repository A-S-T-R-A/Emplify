const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080
console.log("Server is working")

app.use(express.static("public"))
app.use(express.json())

app.post("/download", async (req, res) => {
    const content = req.body.content
    console.log("Received content from download:", content)
    res.send("Received content: " + content)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
