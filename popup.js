async function request(message) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    await chrome.tabs.sendMessage(tab.id, { capture: message })
}

document.querySelector('#capture_png').addEventListener('click', () => request('png'))

document.querySelector('#capture_jpg').addEventListener('click', () => request('jpeg'))

document.querySelector('#capture_pdf').addEventListener('click', () => request('pdf'))