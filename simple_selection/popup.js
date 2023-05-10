chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
            const selectedText = window.getSelection().toString().trim();
            chrome.runtime.sendMessage({ selectedText });
        }
    });
});

chrome.runtime.onMessage.addListener((message) => {
    const selectedTextElement = document.getElementById("selectedText");
    selectedTextElement.textContent = message.selectedText;
});
