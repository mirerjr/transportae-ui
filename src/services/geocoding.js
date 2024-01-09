import axios from "axios";

export default async function geocodeByAddress(address) {
  try {
    const apiUrl ="https://nominatim.openstreetmap.org/search?format=json&q=" +
      encodeURIComponent(address);

    const response = await axios.get(apiUrl);

    const lat = response.data[0].lat;
    const lng = response.data[0].lon;

    return { lat, lng };
  } catch (error) {
    throw new Error("Geocoding falhou devido a: " + error);
  }
}
