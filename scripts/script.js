const key = config.GOOGLE_API_KEY;


navigator.geolocation.getCurrentPosition(success);

function success (pos) {
  const crd = pos.coords;
  console.log('current position: ', crd.latitude, crd.longitude);
  getLocation(crd.latitude, crd.longitude);
};

async function getLocation(lat, lng) {
  try {
    const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
    const data = await (await fetch(api)).json();
    console.log(data);
    console.log(data.results);
    console.log(data.results[0]);
    console.log(data.results[0].formatted_address);
    console.log(data.results[0].address_components[7]);
    console.log('current location: ', data.results[0].address_components[7].long_name);


  for (let i = 0; i < data.results[0].address_components.length; i++) {
    console.log(data.results[0].address_components[i]);
  }

    printData(data, lat, lng);

  } catch(err) {
   console.log(err)
  }
};

printData = (data, lat, lng) => {
  const formattedAddress = data.results[0].formatted_address
  const locationCountry = data.results[0].address_components[7].long_name;
  const locationCountryShort = data.results[0].address_components[7].short_name;
  const streetNumber = data.results[0].address_components[0].long_name;
  const streetName = data.results[0].address_components[1].long_name;
  const district = data.results[0].address_components[2].long_name;
  const cityName = data.results[0].address_components[3].long_name;
  const state = data.results[0].address_components[6].long_name;
  const stateShort = data.results[0].address_components[6].short_name;
  const postalCode = data.results[0].address_components[8].long_name;

  const container = document.getElementById('container');

  const latitude = document.createElement('p');
  const longitude = document.createElement('p');
  const address = document.createElement('p');
  const country = document.createElement('p');
  const number = document.createElement('p');
  const street = document.createElement('p');
  const area = document.createElement('p');
  const city = document.createElement('p');
  const code = document.createElement('p');
  const stateCell = document.createElement('p');

  container.appendChild(latitude);
  container.appendChild(longitude);
  container.appendChild(number);
  container.appendChild(street);
  container.appendChild(area);
  container.appendChild(street);
  container.appendChild(city);
  container.appendChild(stateCell);
  container.appendChild(code);
  container.appendChild(country);

  latitude.innerHTML = `latitude: ${lat}`;
  longitude.innerHTML = `longitude: ${lng}`;
  number.innerHTML = `street number: ${streetNumber}`;
  street.innerHTML = `street name: ${streetName}`;
  area.innerHTML = `district: ${district}`;
  city.innerHTML = `city: ${cityName}`;
  stateCell.innerHTML = `state: ${state}, ${stateShort}`;
  code.innerHTML = `postal code: ${postalCode}`;
  country.innerHTML = `country: ${locationCountry}, ${locationCountryShort}`;
  address.innerHTML = `address: ${formattedAddress}`;
}