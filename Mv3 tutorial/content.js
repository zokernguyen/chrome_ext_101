console.log(`content script executed`);
//You can see this log in console, as CS work on the foreground of the browser.
document.body.style.backgroundColor = "orange";
//As CS can directly manipulate the content of the page, this line will change the background color of the page.

//sending a message
chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
    console.log(response.farewell);
})