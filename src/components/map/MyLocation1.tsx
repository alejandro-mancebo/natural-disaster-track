import { useState, useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet';


export function SelectDisaster(selectDisasterMarker: any) {
  const map = useMap();

  if (selectDisasterMarker.selectDisasterMarker !== "") {
    const lat = selectDisasterMarker.selectDisasterMarker["coords"][0];
    const lng = selectDisasterMarker.selectDisasterMarker["coords"][1];
    map.flyTo([lat, lng], 15);
  }
  return null;
}


interface Props {
  selectMyLocation: boolean;
}

export function LocationMarker({ selectMyLocation }: Props) {
  const [position, setPosition] = useState<any>(null);

  const map = useMap();

  useEffect(() => {
    if (selectMyLocation === true) {
      console.log('Show location', selectMyLocation)
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }
  }, [selectMyLocation]);

  return position === null ? null : (
    <>
      {
        selectMyLocation === true ?
          (<Marker position={position} >
            <Popup><h3>You are here</h3></Popup>
          </Marker>)
          : null
      }
    </>
  )
}