import { Disaster } from "../../types";
import { getFormatDate } from '../../services';

interface Props {
  marker: Disaster;
};


export const MarkerPopupCard = ({ marker }: Props) => {
  // console.log('MarkerPopupCard', marker);
  return (
    <div className="marker-popup-card">
      <h3>{marker.locationName}</h3>
      <p><strong>Coordenates:</strong> [ {marker.coordinates[0].toFixed(4)}, {marker.coordinates[1].toFixed(4)} ]</p>
      <p><strong>Category:</strong> {marker.category}</p>
      <p className="description"><strong>Description:</strong></p>
      <p>{marker.description}</p>
      <p>{getFormatDate(marker.createdAt)}</p>
    </div>
  );
};
