import { useState, useEffect } from 'react';
import { Disaster } from '../../types';
import { difaultMarkers } from '../../data/defaultMarkers';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getFormatDate } from '../../services';

interface Props {
  showDisasterList: boolean;
  selectDisasterMarker: any;
  setSelectDisasterMarker: (selectDisasterMarker: any) => void;
}


export const DisasterList = ({ showDisasterList, selectDisasterMarker, setSelectDisasterMarker }: Props) => {

  const [hide, setHide] = useState(false);
  const [markers, setMarkers] = useState<Disaster[]>();
  // const [markerSelected, setMarkerSelected] = useState(selectDisaster);

  const [disasterLocation, setDisasterLocation] = useState<any>();
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    let storageLocations: string | null = localStorage.getItem('disasterData');
    // console.log('disaster', storageLocations)

    axiosPrivate.get('/api/locations', {
      withCredentials: true,
    })
      .then((response) => {

        setDisasterLocation(response.data);
        console.log('locations', response.data)
        setMarkers(response.data)
      })
      .catch(error => {
        console.error('[Users page] Get users error:', error);
      })

    let initialMarkers: Disaster[];

    if (storageLocations) {
      initialMarkers = JSON.parse(storageLocations);
    } else {
      initialMarkers = difaultMarkers;
    }
    // setMarkers(initialMarkers)

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

                    <div className=" text-lg  font-medium -mb-1">{marker.locationName}</div>
                    <div className=" text-sm  mb-2">{marker.username}</div>
                    <div>[{marker.coordinates[0].toFixed(5)}, {marker.coordinates[1].toFixed(5)}]</div>
                    <div>{marker.category}</div>
                    <div>{marker.description}</div>
                    <div>{getFormatDate(marker.createdAt)}</div>

                    {/* <div className=" text-xs">{marker._id}</div> */}
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
