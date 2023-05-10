import fetchLocation from "./api/fetchLocation.js";

chrome.runtime.onInstalled.addListener(details => {
    fetchLocation();
});

chrome.runtime.onMessage.addListener(msg => {
    const { event, dataPrefs } = msg
    switch (msg.event) {
        case 'onStart':
            handleOnStart(dataPrefs);
            break;
        case 'onStop':
            handleOnStop();
            break;
        default:
            break;
    }
});

const handleOnStart = (dataPrefs) => {
    console.log('onStart in background', dataPrefs);
    chrome.storage.local.set(dataPrefs);
};

const handleOnStop = () => {
    console.log('onStop in background');
};