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
    console.log(data.results[0]);
    console.log(data.results[0].formatted_address);
    console.log(data.results[0].address_components[7]);
    console.log('current location: ', data.results[0].address_components[7].long_name);
    const locationCountry = data.results[0].address_components[7].long_name.toLowerCase().replace(' ', '-');
  } catch(err) {
   console.log(err)
  }
};