// This file fetches location data from the specified endpoint and processes the response.

// The endpoint URL to fetch location data
const LOCATION_ENDPOINT = "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry";

// Function to fetch location data
export default function fetchLocation() {
    // Send a GET request to the location endpoint
    fetch(LOCATION_ENDPOINT)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Process the data and filter out relevant information
            const filteredLocations = data.map(location => ({
                "id": location.id,
                "name": location.name,
                "shortName": location.shortName,
                "tzData": location.tzData
            }));

            // Sort the filtered locations by name
            filteredLocations.sort((a, b) => a.name.localeCompare(b.name));

            //Save locs data to chrome storage
            chrome.storage.local.set({ locations: filteredLocations })

            // Log the filtered locations to the console
            console.log(filteredLocations);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.log(error);
        });
}
