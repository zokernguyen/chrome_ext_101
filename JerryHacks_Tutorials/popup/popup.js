//Elements
const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");

//button elements

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.onclick = function () {
    if (startDateElement.value) {
        console.log("Start date: ", startDateElement.value);
    } else {
        console.log("Start date is invalid!");
    }
};
stopButton.onclick = function () {
    console.log("End date: ", endDateElement.value);
};