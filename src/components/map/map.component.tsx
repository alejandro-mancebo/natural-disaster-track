import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, ZoomControl } from 'react-leaflet';
import { MarkerPopupCard } from './markerPopupCard'
import MarkerClusterGroup from 'react-leaflet-cluster';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

import { Board } from '../board';
import { DisasterList } from './disasterList';
import { MarkerCoords, Disaster } from '../../Types';
import { difaultMarkers } from '../../data/defaultMarkers'
import iconMarker from '../../assets/marker_v1.png'

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../../App.css';

import { LocationMarker, SelectDisaster } from './MyLocation1'


// Create a custom marker icon
const customIcon = new L.Icon({
  iconUrl: iconMarker, // Add the path to your custom marker icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'custom-marker', // Set the class name for the marker
});


interface Props {
  selectMyLocation: boolean;
}

export const MapComponent = ({ selectMyLocation }: Props) => {
  const center = { lat: 43.76145, lng: -79.41089 };
  const ZOOM_LEVEL = 10;

  const [showMarkers, setShowMarkers] = useState(true);
  const [selectDisasterMarker, setSelectDisasterMarker] = useState<any>('');
  const [showDisasterList, setShowDisasterList] = useState(true);

  const storageLocations: string | null = localStorage.getItem('disasterData');

  let initialMarkerList: Disaster[] | [];

  if (storageLocations) {
    initialMarkerList = JSON.parse(storageLocations);
  } else {
    initialMarkerList = difaultMarkers;
  }

  const [newMarker, setNewMarker] = useState<MarkerCoords>();
  const [markerList] = useState(initialMarkerList);


  useEffect(() => {
    setNewMarker(newMarker);
  }, [newMarker]);


  useEffect(() => {
    setSelectDisasterMarker(selectDisasterMarker);
  }, [selectDisasterMarker]);


  const created = (e: any) => {
    const id: MarkerCoords['_id'] = uuidv4().replace(/-/g, '').slice(0, 16);
    const coords: MarkerCoords['coords'] = [e.layer._latlng.lat, e.layer._latlng.lng];
    setNewMarker({ _id: id, coords: coords });
  }


  const handleSelectDisasterMarker = (marker: any) => {
    setSelectDisasterMarker(marker);
  }


  return (
    <>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={true}
        minZoom={4}
        zoomControl={false}
      >
        <FeatureGroup>
          <EditControl
            position='topright'
            onCreated={(e) => created(e)}
            draw={{
              rectangle: false,
              circle: false,
              polyline: false,
              polygon: false,
              circlemarker: false
            }}
          />
        </FeatureGroup>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          showMarkers &&
          <MarkerClusterGroup >
            {
              markerList.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.coords}
                  icon={customIcon}
                  eventHandlers={{
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                    click: () => { handleSelectDisasterMarker(marker) },
                  }}
                >
                  <Popup >
                    <MarkerPopupCard marker={marker} />
                  </Popup>
                </Marker>
              ))
            }
          </MarkerClusterGroup>
        }

        <SelectDisaster selectDisasterMarker={selectDisasterMarker} />
        <ZoomControl position="topright" />
        <LocationMarker selectMyLocation={selectMyLocation} />
      </MapContainer >


      <DisasterList
        showDisasterList={showDisasterList}
        selectDisasterMarker={selectDisasterMarker}
        setSelectDisasterMarker={setSelectDisasterMarker}
      />

      <Board
        newMarker={newMarker!}
        showMarkers={showMarkers}
        setShowMarkers={setShowMarkers}
        showDisasterList={showDisasterList}
        setShowDisasterList={setShowDisasterList}
      />


    </>


  );
};






