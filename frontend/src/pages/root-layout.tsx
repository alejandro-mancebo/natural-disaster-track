import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';

export default function RootLayout() {

  const [selectMyLocation, setSelectMyLocation] = useState(false)
  return (
    <>
      <Header selectMyLocation={selectMyLocation} setSelectMyLocation={setSelectMyLocation} />
      <main>
        <Outlet />
      </main>
    </>
  )
}
