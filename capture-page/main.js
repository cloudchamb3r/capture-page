import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>capture-page</h1>
  <p>by <a href="https://github.com/cloudchamb3r">@cloudchamb3r</a><p/>
  <br/>
  <button id="capture_png">capture png!</button>
  <button id="capture_jpg">capture jpg!</button>
  <button id="capture_pdf">capture pdf!</button>
`


async function request(message) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['html2canvas.min.js', 'jspdf.umd.min.js'],
  })
  await chrome.tabs.sendMessage(tab.id, { capture: message })
}

document.querySelector('#capture_png').addEventListener('click', () => request('png'))

document.querySelector('#capture_jpg').addEventListener('click', () => request('jpeg'))

document.querySelector('#capture_pdf').addEventListener('click', () => request('pdf'))