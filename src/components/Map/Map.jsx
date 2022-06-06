import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, useMap ,Marker,Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import iconMarker2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconMarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from 'react';
const Map = ({className}) => {
  
  let mapClassName = styles.map;
  if(className) mapClassName = ` ${mapClassName} ${className}`;

useEffect(() => {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconMarker2x.src,
    iconUrl: iconMarker.src,
    shadowUrl: iconMarkerShadow.src
  })

  return () => {
    
  };
}, []);

  return (
<MapContainer className={mapClassName} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
 
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  
</MapContainer>
)};


export default Map;
