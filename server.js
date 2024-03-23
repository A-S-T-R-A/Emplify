const express = require("express")
const puppeteer = require("puppeteer")
const bodyParser = require("body-parser")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static("public"))
app.use(bodyParser.json())

app.post("/generate-pdf", async (req, res) => {
    const content = req.body.content

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.setContent(content, {
            waitUntil: "networkidle0",
        })

        const pdf = await page.pdf({ format: "A4", printBackground: true })
        await browser.close()

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="generated-document.pdf"',
        })
        res.send(pdf)
    } catch (error) {
        console.error("PDF Generation Error:", error)
        res.status(500).send("An error occurred during the PDF generation.")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
