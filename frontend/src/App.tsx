import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
// import { Header } from './components/header';
import { MapComponent } from './pages/map-page';

import RootLayout from './pages/root-layout';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import SignUpPage from './pages/signup-page';

import RequireAuth from './components/require-auth';
import { PersistLogin } from './components/persist-login';

import Page404 from './pages/page-404';

import './App.css';



function App() {

  const [selectMyLocation, setSelectMyLocation] = useState(false)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} >

        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* protect routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/map" element={<MapComponent selectMyLocation={selectMyLocation} />} />
          </Route>
        </Route>

        {/* not found */}
        <Route path="*" element={<Page404 />} />
      </Route>
    )
  );


  return (
    <>
      {/* <Header selectMyLocation={selectMyLocation} setSelectMyLocation={setSelectMyLocation} /> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
