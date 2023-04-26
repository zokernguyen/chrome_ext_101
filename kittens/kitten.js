console.log("Meow meow meow!");

let filenames = [
    "meow1.jpg",
    "meow2.jpg",
    "meow3.jpg",
    "meow4.jpg",
    "meow5.jpg"
];

let imgs = document.getElementsByTagName('img');

for (imgEle of imgs) {
    let r = Math.floor(Math.random() * filenames.length);
    let file = filenames[r];
    let url = chrome.runtime.getURL('pics/' + file);
    imgEle.src = url;
    console.log(imgEle.src);
}
