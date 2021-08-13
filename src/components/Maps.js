import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function MapExample() {
    const posRomero = {
        lat: 13.678957590638175,
        lng: -89.23583123959206,
    };
    const posIcas = {
        lat: 13.68161012846494,
        lng: -89.23708023226781,
    };
    const posPoli = {
        lat: 13.682974232491249,
        lng: -89.23426755860754,
    };
    const posLabs = {
        lat: 13.679562239996667,
        lng: -89.23606110424964,
    };

    const center = {
        lat: 13.680521733835679, 
        lng: -89.23555350984262
    }

    return (
        <div className="relative w-full rounded-xl shadow-lg">
            <LoadScript googleMapsApiKey="AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk">
                <GoogleMap
                    mapContainerClassName="w-full h-full rounded-xl"
                    zoom={17}
                    center={center}
                >
                    <Marker key="location" position={posRomero} />
                    <Marker key="location" position={posIcas} />
                    <Marker key="location" position={posPoli} />
                    <Marker key="location" position={posLabs} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
