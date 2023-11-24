
export type MarkerCoords = {
  _id: string;
  coordinates: [number, number];
}


export type Category = {
  value: string;
  label: string;
}


export type Disaster = {
  _id: MarkerCoords['_id'];
  locationName: string;
  coordinates: MarkerCoords['coordinates'];
  category: string;
  description: string;
  userId: string;
  username: string;
  createdAt: Date;
}

export type User = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
