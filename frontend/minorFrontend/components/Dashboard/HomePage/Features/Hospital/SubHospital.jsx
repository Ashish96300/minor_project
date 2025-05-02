import axios from "axios";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function RegisterHospital() {
  const [hospitalName, setHospitalName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [helpLineNumber, setHelpLineNumber] = useState('');
  const [avatarH, setAvatarH] = useState(null);
  const [imagesH, setImagesH] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !hospitalName ||
      !email ||
      !address ||
      !helpLineNumber ||
      !avatarH ||
      !imagesH?.length
    ) {
      toast.error("Please fill in all fields and upload files.");
      return;
    }

    const formData = new FormData();
    formData.append('hospitalName', hospitalName);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('helpLineNumber', helpLineNumber);
    formData.append('avatarH', avatarH);

    for (let i = 0; i < imagesH.length; i++) {
      formData.append('imagesH', imagesH[i]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/v1/hospital/Add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success("Hospital successfully registered! 🎉");

      setHospitalName('');
      setEmail('');
      setAddress('');
      setHelpLineNumber('');
      setAvatarH(null);
      setImagesH(null);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again. 😢");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register a Hospital</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Hospital Name"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="number"
            placeholder="Helpline Number"
            value={helpLineNumber}
            onChange={(e) => setHelpLineNumber(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <div>
            <label className="block mb-1 text-sm font-medium">Avatar Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarH(e.target.files[0])}
              className="w-full text-white file:bg-pink-600 file:border-none file:px-4 file:py-2 file:rounded file:text-sm bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Hospital Images (Multiple)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImagesH(e.target.files)}
              className="w-full text-white file:bg-pink-600 file:border-none file:px-4 file:py-2 file:rounded file:text-sm bg-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 transition-colors py-3 rounded text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


/******************************************************************************************************************************************* */


export function SearchHospital() {
  const [hospitals, setHospital] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const navigate = useNavigate();

  // Handle navigation to contact admin page
  const handleAdmin = () => {
    if (selectedHospital && selectedHospital._id) {
      navigate(`/contacthosptaluploader/${selectedHospital._id}`);
    }
  };

  // Fetch hospital data on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/hospital/Read");
        if (response.data && response.data.data.hospitals) {
          setHospital(response.data.data.hospitals);
          console.log(response.data.data.hospitals);
        } else {
          console.error("No hospitals data found in the response");
        }
      } catch (error) {
        console.log("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Hospitals</h1>

      {/* Hospital Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div
              key={hospital._id}
              onClick={() => setSelectedHospital(hospital)}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <img
                src={
                  hospital.imagesH && hospital.imagesH.length > 0
                    ? hospital.imagesH[0]
                    : "https://via.placeholder.com/150"
                }
                alt={hospital.hospitalName}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{hospital.hospitalName}</h2>
                <p className="text-sm text-gray-400">{hospital.email}</p>
                <p className="text-sm">{hospital.location}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hospital available</p>
        )}
      </div>

      {/* Selected Hospital Details */}
      {selectedHospital && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">

          <div className='flex flex-row gap-3'>
          <img src={selectedHospital.avatarH} alt='hospital-image'
          className="w-16 h-16 border-radius rounded-4xl ring-2 ring-pink-600'" />

          <h2 className="text-3xl font-bold mb-4">{selectedHospital.hospitalName}</h2>

          
          </div>
          <br />

          <div className="flex flex-wrap gap-4 mb-4">
            {selectedHospital.imagesH && selectedHospital.imagesH.length > 0 ? (
              selectedHospital.imagesH.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`hospital-image-${index}`}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              ))
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="default"
                className="w-40 h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/*<h3 className="text-2xl font-semibold">{selectedHospital.hospitalName}</h3>*/}
          <p className="text-lg">{selectedHospital.address}</p>
          <p className="text-lg mt-2">{selectedHospital.description}</p>
          <p className="text-lg mt-2">Help Line Number: {selectedHospital.helpLineNumber}</p>
          {/*<p className="text-lg mt-2">Avatar: {selectedHospital.avatarH}</p>*/}
          {/*<p className="text-lg mt-2">Location: {selectedHospital.location}</p>*/}
          <p className="text-sm text-gray-400 mt-2">Email: {selectedHospital.email}</p>

          <button
            type="button"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
            onClick={handleAdmin}
          >
            contact hospital
          </button>
        </div>
      )}
    </div>
  );
}
