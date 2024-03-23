const express = require("express")
const puppeteer = require("puppeteer")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json()) // bodyParser.json() является устаревшим, используйте express.json()

app.post("/generate-pdf", async (req, res) => {
    console.log("Received request to generate PDF")

    try {
        console.log("Launching browser...")
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            executablePath: puppeteer.executablePath(),
        })

        console.log("Browser launched.")
        const page = await browser.newPage()
        console.log("New page opened.")

        console.log("Setting content...")
        await page.setContent("<h1>Hello World</h1>") // Простой контент для теста
        console.log("Content set.")

        console.log("Generating PDF...")
        const pdf = await page.pdf({ format: "A4", printBackground: true })
        console.log("PDF generated.")

        await browser.close()
        console.log("Browser closed.")

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="generated-document.pdf"',
        })

        console.log("Sending PDF to client...")
        res.send(pdf)
    } catch (error) {
        console.error("PDF Generation Error:", error)
        res.status(500).send("An error occurred during the PDF generation.")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
