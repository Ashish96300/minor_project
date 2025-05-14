import React, { useState ,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Style } from "../Style";
import UserContext from "../../../../../src/context/Usercontext";
import { useContext } from "react";

export const EmergencyForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [emergencyImages, setEmergencyImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priority , setPriority] = useState("low"); 
  //const [raisedBy, setRaisedBy] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(UserContext);
   const handleFileChange = (e) => {
     const files = [...e.target.files];
     if (files.length > 5) {
       toast.error("You can upload a maximum of 5 images.");
       return;
     }
     setEmergencyImages(files);
   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("priority", priority); 

    formData.append("raisedBy", user.username);

  
    
    emergencyImages.forEach((file) => {
        formData.append(" emergencyImages", file);
      });
  

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/emergency/raise`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-cover bg-center bg-dark-gradient h-screen" 
    //style={{ backgroundImage: 'url("https://www.w3schools.com/w3images/forest.jpg")' }}
    style={{ backgroundImage: `url("/nature2.jpg")` }}
    
    >

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex justify-center items-center h-full text-white ">
        
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg w-full space-y-6 glow-border" >
          
          <h2 className="text-3xl font-semibold text-center text-indigo-500">Report an Emergency</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Emergency Title (e.g., Injured Animal)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
            />

            <input
              type="text"
              placeholder="Location (e.g., Central Park)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <select name="priority"
             onChange={(e) => setPriority(e.target.value)}
             className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
             placeholder="Priority Level"
             required>
              
                <option>low</option>
                <option>mid</option>
                <option>high</option>
            </select>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-white file:bg-indigo-600 file:border-none file:px-4 file:py-2 file:rounded file:text-sm bg-gray-700"
              required
            />
           
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-semibold"
            >
              {loading ? "Submitting..." : "Submit Emergency"}
            </button>
          </form>

          {successMessage && (
            <p className="mt-4 text-green-500 text-center font-semibold">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-500 text-center font-semibold">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};



/************************************************************************************************************** */


export const EmergencyList = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/emergency/emergencies`);
        setEmergencies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch emergencies");
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, []);

  if (loading) return <div className="text-center text-white mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-400 mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Emergency Alerts</h2>
      <div className="grid gap-6 max-w-5xl mx-auto">
        {emergencies.length === 0 ? (
          <p className="text-center">No emergencies available at the moment.</p>
        ) : (
          emergencies.map((emergency) => (
            <div key={emergency._id} className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700">
              <h3 className="text-2xl font-semibold text-cyan-300">{emergency.title}</h3>
              <p className="mt-1 text-gray-300">{emergency.description}</p>
              <p className="mt-1 text-sm text-gray-400">📍 Location: {emergency.location}</p>
              <p className="mt-1 text-sm text-gray-400">⚠️ Priority: {emergency.priority}</p>
              {/*<p className="mt-1 text-sm text-gray-400">⚠️ Priority: {emergency.raisedBy.username}</p>*/}


              {/* Display up to 5 images */}
              {emergency.emergencyImages?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {emergency.emergencyImages.slice(0, 5).map((imgUrl, index) => (
                    <img
                      key={index}
                      src={
                        imgUrl.startsWith("http")
                          ? imgUrl
                          : `${import.meta.env.VITE_API_URL}/${imgUrl}`
                      }
                      alt={`Emergency Image ${index + 1}`}
                      className="rounded-xl object-cover w-full h-32 border border-gray-600"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
