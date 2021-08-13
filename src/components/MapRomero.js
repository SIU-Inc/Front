import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function MapExample() {
    const defaultCenter = {
        lat: 13.678957590638175,
        lng: -89.23583123959206,
    };

    return (
        <div className="relative w-full rounded-xl shadow-lg">
            <LoadScript googleMapsApiKey="AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk">
                <GoogleMap
                    mapContainerClassName="w-full h-full rounded-xl"
                    zoom={17}
                    center={defaultCenter}
                >
                    <Marker key="location" position={defaultCenter} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
