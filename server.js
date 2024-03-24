const puppeteer = require("puppeteer")

async function downloadPDF() {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    const page = await browser.newPage()

    const url = "https://astra-emplify-65e2e0802fb3.herokuapp.com/my-document.pdf"

    await page.goto(url, {
        waitUntil: "networkidle0",
    })

    const pdfBuffer = await page.evaluate(() => document.body.innerText)

    const fs = require("fs")
    fs.writeFileSync("downloaded-my-document.pdf", pdfBuffer, "base64")

    await browser.close()
}

downloadPDF().then(() => console.log("PDF успешно скачан!"))
