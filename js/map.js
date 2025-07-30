const map = L.map('map').setView([48.0077, 7.8225], 14); // Zentrum Betzenhausen

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap-Mitwirkende'
}).addTo(map);

fetch('data/kitas.json')
  .then(res => res.json())
  .then(kitas => {
    kitas.forEach(kita => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(kita.adresse)}`)
        .then(res => res.json())
        .then(loc => {
          if (loc[0]) {
            const { lat, lon } = loc[0];
            L.marker([lat, lon]).addTo(map)
              .bindPopup(`<strong>${kita.name}</strong><br>${kita.adresse}<br>${kita.ö}`);
          }
        });
    });
  });
