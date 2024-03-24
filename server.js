const express = require("express")
const puppeteer = require("puppeteer")
const app = express()
const PORT = process.env.PORT || 8080
console.log("server is working")

app.use(express.static("public"))
app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const fs = require("fs")

app.post("/generate-pdf", async (req, res) => {
    const staticPDF = fs.readFileSync("static-pdf-file.pdf")

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="my-document.pdf"',
    })

    res.send(staticPDF)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
