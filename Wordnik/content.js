chrome.action?.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let selectedText = window.getSelection().toString().trim();

        console.log(selectedText);
        if (selectedText.length > 0) {
            let message = { text: selectedText };
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    });
});

//1. Listen to event to get the selected text.
//2. Send the selected text to the background script via msg.
