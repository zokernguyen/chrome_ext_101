// Add a listener for the 'mouseup' event on the document to get the selected text
const selectText = document.addEventListener('mouseup', function () {
    // Get the selected text
    var selectedText = window.getSelection().toString().trim();

    // Do something with the selected text
    console.log(selectedText);
});

