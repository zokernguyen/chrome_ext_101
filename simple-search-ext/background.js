const baseURLs = {
    "Goolge": "https://www.goolge.com/search?q=",
    "Bing": "https://www.bing.com/search?q=",
    "Wikipedia": "http://en.wikipedia.org/wiki/",
}

chrome.runtime.onInstalled.addListener(() => {
    for (let key of Object.keys(baseURLs)) {
        chrome.contextMenus.create({
            id: key,
            title: key,
            type: "normal",
            contexts: ["selection"]
        });
    }



    chrome.contextMenus.onClicked.addListener(function (info, tab) {

        let baseURL = baseURLs[info.menuItemId];
        let searchURL = baseURL + info.selectionText;
        chrome.tabs.create({ url: searchURL });
    });
})