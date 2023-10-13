import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMap } from 'react-leaflet';
import { MarkerPopupCard } from './markerPopupCard'
import MarkerClusterGroup from 'react-leaflet-cluster';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

import { Board } from '../board';
import { DisasterList } from './disaster-list';
import { MarkerCoords, Disaster } from '../../Types';
import { difaultMarkers } from '../../data/defaultMarkers'
import iconMarker from '../../assets/marker-v1.png'

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../../App.css';

// L.Icon.Default.imagePath = 'https://img.icons8.com/color/48/000000/map-pin.png';
// const icon1 = 'https://img.icons8.com/color/48/000000/map-pin.png';

// Create a custom marker icon
const customIcon = new L.Icon({
  iconUrl: iconMarker, // Add the path to your custom marker icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'custom-marker', // Set the class name for the marker
});


export const MapComponent = () => {
  const center = { lat: 43.76145, lng: -79.41089 };
  const ZOOM_LEVEL = 10;

  const [showMarkers, setShowMarkers] = useState(true);
  const [selectDisaster, setSelectDisaster] = useState('');
  // const [selectListedDisaster, setSelectListedDisaster] = useState('');
  const [showDisasterList, setShowDisasterList] = useState(true);
  const [map, setMap] = useState()


  const markerRef = useRef(null);
  // let mapRef = useMap();

  const storageLocations: string | null = localStorage.getItem('disasterData');

  let pmarkerList: Disaster[] | [];

  if (storageLocations) {
    pmarkerList = JSON.parse(storageLocations);
  } else {
    pmarkerList = difaultMarkers;
  }

  const [newMarker, setNewMarker] = useState<MarkerCoords>();
  const [markerList, setMarkerList] = useState(pmarkerList);


  const created = (e: any) => {
    const id: MarkerCoords['_id'] = uuidv4().replace(/-/g, '').slice(0, 16);
    const coords: MarkerCoords['coords'] = [e.layer._latlng.lat, e.layer._latlng.lng];

    setNewMarker({ _id: id, coords: coords });

    console.log('Create marker _id:', id);
    console.log('Create marker coords:', [e.layer._latlng.lat, e.layer._latlng.lng]);
    console.log('Create marker object:', e);
    console.log('Create newMarker:', newMarker);
  }

  const mapRef = useRef<ReturnType<typeof useMap> | null>(null);

  useEffect(() => {
    setNewMarker(newMarker);

    console.log('Useffect newMarker', newMarker);
  }, [newMarker]);


  useEffect(() => {
    setSelectDisaster(selectDisaster);
    console.log('selectDisaster', selectDisaster);

  }, [selectDisaster]);

  // useEffect(() => {
  //   console.log('mapRef.current 0:', map)
  //   // if (mapRef) {
  //   //   console.log('mapRef.current 1', mapRef.current)
  //   // }
  // }, [map]);


  const getMarkerClassName = (markerId: string) => {
    return markerId === selectDisaster ? 'marker-type-1' : 'marker-type-2';
  }

  const handleSelectDisaster = (id: any) => {
    console.log('handleSelectDisaster', id)
    setSelectDisaster(id);
    // setMarkerList((pre) =>
    //   pre.map((marker) => {
    //     if (marker._id === id) {
    //       return { ...marker, className: getMarkerClassName(id) };
    //     }
    //     return marker;
    //   }))


    console.log(id);
  }

  const onClickShowMarker = () => {
    console.log('onClickShowMarker', selectDisaster);
    const map = mapRef.current;

    console.log('map', map)
    // if (!map) { return; }

    // map.flyTo([43.7598, -79.2253], 8);

    const marker = markerRef.current;
    console.log('onClickShowMarker marker', marker);
    if (marker) {
      marker.openPopup();
    }
  };


  return (
    <>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={true}
        minZoom={4}
      // whenReady={() => setMap(mapRef.current)}
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
                  ref={markerRef}
                  key={index}
                  position={marker.coords}
                  icon={customIcon}
                  eventHandlers={{
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                    click: () => { handleSelectDisaster(marker._id) },
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
      </MapContainer >

      <button className="show-marker" type="button" onClick={onClickShowMarker}>Show marker</button>

      <DisasterList
        showDisasterList={showDisasterList}
        selectDisaster={selectDisaster}
        setSelectDisaster={setSelectDisaster}
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






