chrome.runtime.onInstalled.addListener(() => {
    console.log("Hello, world!");
});

//receiving a message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab
        ? "from the content script " + sender.tab.url
        : "from the extension");
    if (request.greeting === "hello") {
        sendResponse({ farewell: "goodbye" })
    };
});

//creating a sample context menu
// chrome.contextMenus.create({
//     id: "sample",
//     title: "You've selected \"%s\"",
//     // \"%s\" = "<your selection>"
//     contexts: ["selection"]
//     //this option appears on the context of selection (aka selection event did happened) 
// });

//a context menu with handling logic (listener) to search selectied text on wikipedia
chrome.contextMenus.create({
    id: "wiki",
    title: "Search for \"%s\" on Wikipedia",
    contexts: ["selection"],
});

//listener for context menu
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    //the URL that will be added to based on the selection
    const baseURL = "http://en.wikipedia.org/wiki/";
    var newURL = baseURL + info.selectionText;
    //create the new URL in the user's browser
    chrome.tabs.create({ url: newURL });
});

//creating a bookmarks folder
// chrome.bookmarks.create(
//     {
//         'title': 'Bookmarks folder',
//         'parentId': '2'
//     },
//     function (newFolder) {
//         console.log('Bookmark added to ' + newFolder.id);
//     }
// );

//creating a new bookmark
// chrome.bookmarks.create(
//     {
//         title: 'Chrome Ext Tutorial',
//         url: 'https://www.youtube.com/@steamcode4441'
//     },
//     function (newBookmark) {
//         console.log(newBookmark.title + ` is added to bookmark`);
//     }
// );

