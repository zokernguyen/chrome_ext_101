let word = "";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    word = request.text;
});

chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            let selectedText = window.getSelection().toString().trim();
            if (selectedText.length > 0) {
                let message = { text: selectedText };
                chrome.runtime.sendMessage(message);
            }
        }
    });
});

//1. Recei ving msg(selectedText) sent from content script
//2. Calling API to Wordnik dictionary to get selectedText definition
//3. Formatting the response before return it to user
//4. Sending result (definition) to popup for user to view
