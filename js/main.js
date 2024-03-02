const getLocationUrl = function () {
    const getLocationUrl = document.querySelector('#mapUrl')
    const link = document.createElement('a');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
            link.innerText = url
            link.setAttribute('href', url);
            getLocationUrl.appendChild(link);
            getAddress(latitude, longitude)
        }, (error) => {
            console.error("Error getting location:", error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getAddress(latitude, longitude) {
    const getAddressDom = document.querySelector('#address');
    const address = document.createElement('span');
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YourAPIKey`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            const formatedAddress = data.results[0].formatted_address;
            address.innerText = formatedAddress;
        } else {
            address.innerText = data.error_message;
        }
    })
    .catch(error => {
        console.error("Error fetching address:", error);
        address.innerText = error.message;
    });

    getAddressDom.appendChild(address);
}