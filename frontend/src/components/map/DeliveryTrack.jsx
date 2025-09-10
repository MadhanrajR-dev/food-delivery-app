import { MapContainer, TileLayer, Marker, Popup,Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";//default style for appear on frontend
import L from "leaflet";//core object to modify map icon
import { useState, useEffect,useRef } from "react";
import io from "socket.io-client";//to connect with ur socket.io server
import { useParams } from "react-router-dom";

const socket = io('http://localhost:4000'); /* import.meta.env.VITE_API_URL */ 

/* delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})  */
const customerIcon = new L.icon({
   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png", // Blue
  iconSize: [40, 40], 
  iconAnchor: [20, 40], 
  popupAnchor: [0, -40]
})

const deliverPersonIcon = new L.icon({
   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [40, 40], 
  iconAnchor: [20, 40], 
  popupAnchor: [0, -40]
})
const DeliveryTracking = () => {
  const [source,setSource] = useState(null);
  const [destination ,setDestination] = useState(null);
  const [location, setLocation] = useState(null);
  const [deliveryPerson,setDeliveryPerson] = useState({
    name:"",
    eta:""})
  const { orderId } = useParams();
  const menRef = useRef(null);
  console.log(orderId);
  useEffect(() => {
    if (!orderId) {
      return;
    }
    socket.emit("joinRoom", orderId);


    const watchId= navigator.geolocation.watchPosition(
      (position) => {
        console.log(position.coords)
        const { latitude, longitude } = position.coords;

        if(latitude && longitude){

       const newLocation = { lat: latitude, lng: longitude };

        setLocation(newLocation);

        socket.emit("deliverylocation", {
          orderId,
          location:newLocation,
          name,
          eta:"",
           customerLocation: {
    lat:13.0449,
    lng:80.1997,
  },
          
        });
        }
  
      },
      (error) => {
        console.error(error.message);
        alert("please enable location service")
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 5000,
      }
    );

    

    socket.on("location", ({
      location,name,eta,etaText,customerLocation}) => {
      console.log("update",location + name + eta);
      setLocation(location);
      setDeliveryPerson({name,eta,etaText})
      setSource(location);
      setDestination(customerLocation);
    });

    if(menRef.current){
    menRef.current.setLatLag([location.lat,location.lng])
    }

    return () => {
        navigator.geolocation.clearWatch(watchId)
      socket.disconnect();
    };
  }, [orderId]);

  if (!location) {
    return <p className="m-6 text-lg">Getting you location...</p>;
  }

  return (
    <div className="pt-10 flex justify-center mt-5">
  <div className="w-full max-w-4xl h-[400px] border rounded-lg overflow-hidden">
      <MapContainer
      center={location}
      zoom={15}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%", padding:"0px",margin:"px" }}      
      >
        <TileLayer
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>
        {deliveryPerson && (
           <Marker position={location} icon={deliverPersonIcon}>
          <Popup>
             <strong>{deliveryPerson.name}</strong><br />
             <small className="text-bold">  {deliveryPerson.etaText}  </small><br />
          </Popup>
        </Marker>

        )}

   {destination && (
    <Marker position={destination} icon={customerIcon}>
      <Popup>
        <strong>waiting for emii...</strong>

      </Popup>
    </Marker>
   )

   }

        {source && destination &&(
        <Polyline  positions={[source, destination]} color="blue">

        </Polyline>
        )}
       
       
      </MapContainer>
      </div>
    </div>
  );
};

export default DeliveryTracking;
