import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';

interface Props {
  selectMyLocation: boolean;
  setSelectMyLocation: (selectMyLocation: boolean) => void;
}

export const Header = ({ selectMyLocation, setSelectMyLocation }: Props) => {

  const { auth, setAuth }: any = useAuth();
  const [username, setUsername] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const usernameStore = localStorage.getItem('username') || '';

  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location)

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      setIsAuth(true)
      setUsername(usernameStore);
    }
  }, [auth, username]);




  function refreshPage() {
    window.location.reload();
  }

  function clickLocation() {
    setSelectMyLocation(!selectMyLocation)
    console.log('Click my location', selectMyLocation)
  }



  const handleLogout = async () => {

    // Use axios
    await axiosPrivate.post('/logout', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 204) {
          setAuth({});
          //navigate('/', { replace: true });

          localStorage.removeItem('persist');
          // localStorage.removeItem('isLoading');
          localStorage.removeItem('username');
          navigate('/');
          // window.location.reload();
        }
      })
      .catch((errors) => {
        if (!errors) {
          console.error('[header] No server response');
        } else if (errors) {
          console.error('[header] Something happend');
        } else {
          console.error('[header] Logout failed');
        }
      });
  };

  return (
    <header className="flex px-6 py-3 justify-between items-center" >
      <div className="flex align-middle" >
        <Link to="/" className="logo mobile" >NDT</Link> {/* onClick={refreshPage} */}
        <Link to="/" className="text-xl cursor-pointer border-2 rounded-lg px-3 py-2 mr-8 hover:text-sky-600 " >Natural Disaster Track</Link> {/* onClick={refreshPage} */}

        {isAuth && usernameStore ?
          <>
            <Link className="m-3 hover:underline" to="/map">Map</Link>
            {location.pathname === '/map' &&
              <ul className="m-3 hover:underline">
                <li className="mobile" onClick={clickLocation}>{selectMyLocation ? "Hide " : "Show"}</li>
                <li className="cursor-pointer " onClick={clickLocation}>{selectMyLocation ? "Hide my location" : "Show my location"}</li>
              </ul>
            }
          </>
          : null
        }
      </div>

      <nav className="flex justify-between items-center ">
        {isAuth && usernameStore
          ? <NavLink to='/user-profile'>{username}</NavLink>
          : null
        }

        {!isAuth ?
          <>
            <NavLink className="px-5 " to="/signup">Sign Up</NavLink>
            <NavLink className="px-5" to="/login">Login</NavLink>
          </>
          : null
        }

        {isAuth ?
          <button className="mx-5 px-3 py-1"
            type="button"
            onClick={handleLogout}
          >logout
          </button>
          : null
        }

      </nav>
    </header>
  );
};
