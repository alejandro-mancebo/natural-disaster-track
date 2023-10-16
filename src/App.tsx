import { useState } from 'react';
import { Header } from './components/header';
import { MapComponent } from './components/map';

import './App.css';

function App() {

  const [selectMyLocation, setSelectMyLocation] = useState(false)

  return (
    <>
      <Header selectMyLocation={selectMyLocation} setSelectMyLocation={setSelectMyLocation} />
      <MapComponent selectMyLocation={selectMyLocation} />
    </>
  );
};

export default App;
