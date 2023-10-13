
export type MarkerCoords = {
  _id: string;
  coords: [number, number];
}


export type Category = {
  value: string;
  label: string;
}


export type Disaster = {
  _id: MarkerCoords['_id'];
  locationName: string;
  coords: MarkerCoords['coords'];
  category: string;
  description: string;
}

