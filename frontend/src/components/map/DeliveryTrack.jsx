import { MapContainer, TileLayer, Marker, Popup,Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";//default style for appear on frontend
import L from "leaflet";//core object to modify map icon
import { useState, useEffect } from "react";
import io from "socket.io-client";//to connect with ur socket.io server
import { useParams } from "react-router-dom";

const socket = io("http://localhost:4000");

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
}) 

const DeliveryTracking = () => {
  const [source,setSource] = useState(null);
  const [destination ,setDestination] = useState(null);
  const [location, setLocation] = useState(null);
  const [deliveryPerson,setDeliveryPerson] = useState({
    name:"",
    eta:""})
  const { orderId } = useParams();
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
          name:"madhan",
          eta:"10 mins",
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
        timeout: 5000,
        maximumAge: 0,
      }
    );

    

    socket.on("location", ({
      location,name,eta,customerLocation}) => {
      console.log("update",location + name + eta);
        
      setLocation(location);
      setDeliveryPerson({name,eta})
      setSource(location);
      setDestination(customerLocation);
    });

    return () => {
        navigator.geolocation.clearWatch(watchId)
      socket.disconnect();
    };
  }, [orderId]);

  if (!location) {
    return <p className="m-6 text-lg">Getting you location...</p>;
  }

  return (
    <>
      <MapContainer
        center={location}
        zoom={15}
        style={{ height: "60vh", width: "60%", margin: "20px" }}
      >
        <TileLayer
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>
        {deliveryPerson && (
           <Marker position={location}>
          <Popup>
             <strong>{deliveryPerson.name}</strong><br />
             <small>{deliveryPerson.eta}  </small><br />
          </Popup>
        </Marker>

        )}
        {source && destination &&(
        <Polyline  positions={[source, destination]} color="blue">

        </Polyline>
        )}
       
       
      </MapContainer>
    </>
  );
};

export default DeliveryTracking;
