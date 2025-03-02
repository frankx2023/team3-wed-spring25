document.addEventListener("DOMContentLoaded", function () {
  console.log("map.js loaded");

  // Initialize the map
  let map = L.map("map").setView([43.6532, -79.3832], 13); // Default to Toronto
  let marker;
  let locationData = {
    address: "",
    lat: "",
    lng: "",
  };

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  function updateLocationField(address, lat, lng) {
    // Update the hidden location field with formatted data
    const locationString = `${address} [${lat}, ${lng}]`;
    document.getElementById("id_location").value = locationString;

    // Store the data for later use
    locationData.address = address;
    locationData.lat = lat;
    locationData.lng = lng;
  }

  // Function to handle location selection
  function onMapClick(e) {
    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(map);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        const address = data.display_name;
        updateLocationField(address, e.latlng.lat, e.latlng.lng);
        marker.bindPopup(address).openPopup();
      })
      .catch((error) => console.error("Error:", error));
  }

  // Add click event to map
  map.on("click", onMapClick);

  // Search functionality
  const searchInput = document.getElementById("location-search");
  const searchButton = document.getElementById("search-location");

  function searchLocation() {
    const query = searchInput.value;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const location = data[0];
          map.setView([location.lat, location.lon], 16);

          if (marker) {
            map.removeLayer(marker);
          }

          marker = L.marker([location.lat, location.lon]).addTo(map);
          updateLocationField(
            location.display_name,
            location.lat,
            location.lon
          );
          marker.bindPopup(location.display_name).openPopup();
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // Add event listeners
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchLocation();
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchLocation();
    }
  });

  // If there's an existing location, show it on the map
  const existingLocation = document.getElementById("id_location").value;
  if (existingLocation) {
    // Try to parse coordinates if they exist
    const match = existingLocation.match(/\[([-\d.]+),\s*([-\d.]+)\]/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      map.setView([lat, lng], 16);
      marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(existingLocation.split("[")[0].trim()).openPopup();
    }
  }
});
console.log("map.js loaded");
console.log("mkdkkdkd");
