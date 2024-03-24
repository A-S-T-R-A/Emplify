const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post("/generate-pdf", (req, res) => {
    try {
        console.log("Received content for PDF generation:", req.body.content)
        res.status(200).send("PDF generation request received successfully.")
    } catch (error) {
        console.error("Error during PDF generation:", error)
        res.status(500).send("An error occurred during the PDF generation.")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
