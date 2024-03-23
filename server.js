const express = require("express")
const puppeteer = require("puppeteer")
const app = express()
const PORT = process.env.PORT || 3000
console.log("server is working")

app.use(express.static("public"))
app.use(express.json())

app.post("/generate-pdf", async (req, res) => {
    const content = req.body.content
    console.log("Received content for PDF generation:", content)

    try {
        const browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--single-process",
            ],
        })

        const page = await browser.newPage()

        await page.setContent(content, {
            waitUntil: "networkidle0",
        })

        const pdf = await page.pdf({ format: "A4", printBackground: true })

        await browser.close()

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="my-document.pdf"',
        })
        res.send(pdf)
    } catch (error) {
        res.status(500).send("An error occurred during the PDF generation.")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
