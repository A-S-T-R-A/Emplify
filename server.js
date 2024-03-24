const express = require("express")
const puppeteer = require("puppeteer")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.static("public"))

app.post("/generate-pdf", async (req, res) => {
    const { content } = req.body
    if (!content) {
        return res.status(400).send("Bad Request: No content provided")
    }

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setContent(content, {
            waitUntil: "networkidle0",
        })
        const pdfBuffer = await page.pdf({ format: "A4" })

        await browser.close()

        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition", "attachment; filename=document.pdf")
        res.send(pdfBuffer)
    } catch (error) {
        console.error("Error generating PDF:", error)
        res.status(500).send("Server Error: Could not generate PDF")
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
