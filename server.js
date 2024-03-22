const express = require("express")
const puppeteer = require("puppeteer")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000

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

        const styles = `
        body * {
            margin: 0;
            padding: 0;
        }
        
        .bold {
            font-weight: bold;
        }
        
        .wrapper {
            display: flex;
        }
        
        .wrapper p:focus,
        .wrapper li:focus,
        .wrapper h1:focus,
        .wrapper h2:focus,
        .wrapper h3:focus {
            outline: 1px solid #5e5e5e27;
            background-color: #f3f3f341;
        }
        
        .wrapper *::selection {
            background-color: #0000000f;
            color: black;
        }
        
        .subWrapper {
            display: flex;
            align-items: flex-start;
            margin: 0;
            padding: 0;
            font-family: 'Lato', sans-serif;
            font-size: 12px;
            line-height: 20px;
        }
        
        .container {
            display: grid;
            grid-template-columns: 1fr 2fr;
            width: 210mm;
            height: 297mm;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .left-column {
            padding: 40px;
            background-color: rgb(231, 231, 231);
        }
        
        .leftside-name-block {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .leftside-name-block-text {
            font-size: 24px;
            font-weight: bolder;
            font-family: 'Arial';
        
        }
        
        .leftside-name-subtitle-block-text {
            font-size: 10px;
        }
        
        .leftside-content-block,
        .employment-item,
        .education-item {
            margin-bottom: 20px;
        }
        
        .leftside-content-block {
            padding-left: 20px;
            display: flex;
            flex-direction: column;
        }
        
        .leftside-content-block-title {
            font-weight: bold;
            margin-bottom: 8px;
            font-family: 'Arial';
        
        }
        
        .leftside-content-block-text,
        .leftside-content-block-link {
            font-size: 12px;
            margin-bottom: 5px;
        }
        
        .leftside-content-block-link {
            cursor: pointer;
            color: black;
            text-decoration: none;
        }
        
        .right-column {
            padding: 40px;
        }
        
        .right-column-summary-block {
            padding-bottom: 30px;
        }
        
        .right-column-summary-block-text {
            padding-bottom: 10px;
        }
        
        .right-block-title {
            padding-bottom: 10px;
            font-size: 20px;
            letter-spacing: 0.2px;
            font-weight: bold;
            font-family: 'Arial';
        
        }
        
        .right-block-text-position {
            font-weight: bold;
            font-family: 'Arial';
        
        }
        
        .right-block-text-date {
            color: #959BA6;
        }
        
        .downloadBtn {
            width: 200px;
            height: 40px;
            border: none;
            cursor: pointer;
            margin-top: 50px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        
        .downloadBtn:hover {
            filter: brightness(90%);
        }
        
        .employment-item ul {
            padding-left: 20px;
        }
        `

        await page.addStyleTag({ content: "styles.css" })

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
