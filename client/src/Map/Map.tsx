import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useCities } from "../hooks/useCities";
import { City } from "../City";

export const Map = () => {
  // tel aviv coordinates
  const center: [number, number] = [32.0853, 34.7818];

  const { cities } = useCities();
  console.log("cities", cities ? cities[0]?.location : "No cities available");

  return (
    <MapContainer
      center={center}
      zoom={8.2}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cities ? (
        cities
          ?.filter((city) => city.location !== null)
          .map((city) => (
            <City
              key={city.name}
              position={[city.location.lat, city.location.lng]}
              name={city.name}
              rate={city.rate}
              exempt_limit={city.ceiling}
            />
          ))
      ) : (
        <div>No cities available</div>
      )}
    </MapContainer>
  );
};
