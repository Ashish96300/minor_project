
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../src/context/Usercontext.js";
import axios from "axios";

import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { Smile, Handshake, Home } from "lucide-react";

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, 
        {
            username: name, 
            password: password
        },
        { 
            withCredentials: true 
        }
      );


      setUser(response.data.data.user);
      console.log('dddata' ,response.data.data.user)
     
      localStorage.setItem('token', response.data.data.accessToken);
      
      toast.success('🦄 logged in!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      if (response.data.data.user.username) {
        toast.success(`🏡 Welcome ${response.data.data.user.username}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error('Username not found in response data.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      navigate('/HomePage');
    }
    catch (err) {
      if (err.response && err.response.data) {
        const backendData = err.response.data;
        console.log('Backend Data:', backendData);
        if (backendData.message) {
          setError(backendData.message);
          toast.error(backendData.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        } else if (backendData.errors && backendData.errors.length > 0) {
          const errorMessages = backendData.errors.map((e) => e.message).join(", ");
          setError(errorMessages);
          toast.error(errorMessages, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        } else {
          setError("Something went wrong. Please try again.");
          toast.error('Something went wrong. Please try again', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } else {
        setError(err.message);
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post('http://localhost:8000/api/v1/users/login', 
//         {
//             username: name, 
//             password: password
//         },
//         { 
//             withCredentials: true 
//         });

//         // Log the response for debugging
//         console.log('Login Response:', response);

//         if (response.data && response.data.data && response.data.data.user) {
//           console.log('Login Response:', response.data.data.user);
//           setUser(response.data.data.user);  // Corrected to access user from response.data.data.user


//             toast.success('🦄 logged in!', {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 transition: Bounce,
//             });

//             toast.success(`🏡 Welcome ${response.data.user.username}`, {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 transition: Bounce,
//             });

//             navigate('/HomePage');
//         }
//     } catch (err) {
//         console.error('Login Error:', err);
//         // Handle error as usual
//     }
// };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Little Paws Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-700">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
