import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

const Map = ({ markerLocations }) => {
    const [mapCenter, setMapCenter] = useState([50, 9]);
    const [lat, lng] = useUrlLocation()

    useEffect(() => {
        if (lng && lat) setMapCenter([lat, lng])
        // else setMapCenter([50, 9])
    }, [lng, lat])

    const { isLoading: isLoadingGeoLocation,
        position: geoPosition,
        getPosition
    } = useGeoLocation()
    useEffect(() => {
        if (geoPosition?.lat && geoPosition?.lng) setMapCenter([geoPosition.lat, geoPosition.lng])
    }, [geoPosition])


    return (
        <div className="mapContainer">
            <MapContainer className="map" center={mapCenter} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <button onClick={getPosition} className="getLocation">{isLoadingGeoLocation ? "Loading..." : "use your location"}</button>
                <DetectClick />
                <ChangeCenter position={mapCenter} />
                {markerLocations.map((item) => {
                    return <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.host_location}
                        </Popup>
                    </Marker>
                })}
            </MapContainer>
        </div>
    );
}

export default Map;

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: e => navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null;
}