import { useState, useEffect } from 'react';
import { Disaster } from '../../Types';
import { difaultMarkers } from '../../data/defaultMarkers'


interface Props {
  showDisasterList: boolean;
  selectDisasterMarker: any;
  setSelectDisasterMarker: (selectDisasterMarker: any) => void;
}


export const DisasterList = ({ showDisasterList, selectDisasterMarker, setSelectDisasterMarker }: Props) => {

  const [hide, setHide] = useState(false);
  const [markers, setMarkers] = useState<Disaster[]>();
  // const [markerSelected, setMarkerSelected] = useState(selectDisaster);

  useEffect(() => {
    const storageLocations: string | null = localStorage.getItem('disasterData');
    // console.log('disaster', storageLocations)

    let initialMarkers: Disaster[];

    if (storageLocations) {
      initialMarkers = JSON.parse(storageLocations);
    } else {
      initialMarkers = difaultMarkers;
    }
    setMarkers(initialMarkers)
  }, []);


  return (
    <>
      {
        showDisasterList ? (
          <div className="disaster-list" >
            <div className="disaster-list-header">
              <h3>Disaster List</h3>
              <button className="disaster-list-button"
                type="button"
                onClick={() => setHide(!hide)}>{hide ? "x" : "-"}
              </button>
            </div>

            {hide && markers &&
              <div className="scroll-bar">
                {markers.map((marker, index) => (
                  <div
                    key={index}
                    className={`disaster-marker ${marker._id === selectDisasterMarker._id ? "active" : null}`}
                    onClick={() => setSelectDisasterMarker(marker)}>
                    <hr />
                    <div>{marker._id}</div>
                    <div>{marker.locationName}</div>
                    <div>[{marker.coords[0].toFixed(4)}, {marker.coords[1].toFixed(4)}]</div>
                    <div>{marker.category}</div>
                  </div>
                ))}
              </div>
            }
          </div>
        ) : null
      }
    </>
  );
};
