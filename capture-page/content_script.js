import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function captureImage(html, type) {
    const capture = await html2canvas(html)

    return capture;
}

async function capturePdf(html) {
    const capture = await html2canvas(html)
    const pdf = new jsPDF(capture)

    return pdf;
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    console.log('test..');
    const html = document.querySelector('html')
    if (request.capture === 'png' || request.capture === 'jpeg') {
        const capture = await captureImage(html, request.capture)
        const link = document.createElement('a')
        link.href = capture.toDataURL(`image/${request.capture}`)
        link.donwload = `capture.${request.capture}`
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)

    }
    else if (request.capture === 'pdf') {
        const pdf = await capturePdf(html)
        pdf.save();
    }
})