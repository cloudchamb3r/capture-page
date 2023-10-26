let jsPDF;
let html2canvas;
(async () => {

    const src1 = chrome.runtime.getURL("html2canvas.min.js");
    const contentMain1 = await import(src1);
    html2canvas = contentMain1;


    const src2 = chrome.runtime.getURL("jspdf.umd.min.js");
    const contentMain2 = await import(src2);
    jsPDF = contentMain2.jsPDF;

})();

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
        console.log(html2canvas)
        const capture = await captureImage(html, request.capture)
        const link = document.createElement('a')
        link.href = capture.toDataURL(`image/${request.capture}`)
        link.donwload = `capture.${request.capture}`
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)
    }
    else if (request.capture === 'pdf') {
        console.log(jsPDF)
        const pdf = await capturePdf(html)
        pdf.save();
    }
})