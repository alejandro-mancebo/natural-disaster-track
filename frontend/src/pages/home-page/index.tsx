import { Link, useNavigate } from 'react-router-dom';
import { axiosPrivate } from "../../api/axios";
import useAuth from '../../hooks/useAuth';


export default function HomePage() {
  const navigate = useNavigate();
  const { auth, setAuth }: any = useAuth();

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

          // localStorage.removeItem('jwt');
          // localStorage.removeItem('email');
          localStorage.removeItem('persist');
          window.location.reload();
        }
      })
      .catch((errors) => {
        if (!errors) {
          console.error('[Home page] No server response');
        } else if (errors) {
          console.error('[Home page] Something happend');
        } else {
          console.error('[Home page] Logout failed');
        }
      });
  };


  return (
    <section className="h-[calc(100vh-72px)] bg-sky-200 ">
      <div className=" container h-[calc(100vh-72px)] mx-auto p-8 border-2 border-neutral-400 rounded-xl bg-slate-200 ">
        <h1 className="text-center text-xl my-2" >Welcome to the Natural Disaster Track</h1>
        <p>Welcome to the Natural Disaster Track</p>
      </div>

    </section>
  )
}
