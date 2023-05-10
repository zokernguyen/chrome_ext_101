//Elements
const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");

//button elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.onclick = () => {
    const dataPrefs = {
        locationId: locationIdElement.value,
        startDate: startDateElement.value,
        endDate: endDateElement.value,
        tzData: locationIdElement.options[locationIdElement.selectedIndex].getAttribute('data-tz')
    };

    chrome.runtime.sendMessage({ event: 'onStart', dataPrefs });
};
stopButton.onclick = () => {
    chrome.runtime.sendMessage({ event: 'onStop' });
};

//get required data key (put in an array) and receive the result as a params of a callback.
chrome.storage.local.get(["locationId", "startDate", "endDate", "locations"], (result) => {
    const { locationId, startDate, endDate, locations } = result;

    setLocations(locations);

    if (locationId) locationIdElement.value = locationId;
    if (startDate) startDateElement.value = startDate;
    if (endDate) endDateElement.value = endDate;
    console.log(locations);
});

const setLocations = (locations) => {
    locations.forEach(location => {
        let optionElement = document.createElement("option");
        optionElement.value = location.id;
        optionElement.innerHTML = location.name;
        optionElement.setAttribute('data-tz', location.tzData);
        locationIdElement.appendChild(optionElement);
    });
}