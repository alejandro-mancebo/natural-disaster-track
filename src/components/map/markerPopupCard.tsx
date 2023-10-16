import { Disaster } from "../../Types";

interface Props {
  marker: Disaster;
};


export const MarkerPopupCard = ({ marker }: Props) => {
  // console.log('MarkerPopupCard', marker);
  return (
    <div className="marker-popup-card">
      <h3>{marker.locationName}</h3>
      <p><strong>Coordenates:</strong> [ {marker.coords[0].toFixed(4)}, {marker.coords[1].toFixed(4)} ]</p>
      <p><strong>Category:</strong> {marker.category}</p>
      <p className="description"><strong>Description:</strong></p>
      <p>{marker.description}</p>
    </div>
  );
};
