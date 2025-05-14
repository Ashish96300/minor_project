import { useState ,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Style } from "../Style";

export function RegisterFosterHome() {
    const [FosterName ,sethomeName] = useState('');
    const [email ,setEmail] = useState('');
    const [address ,setAddress] = useState('');
    const [contact ,setContact] = useState('');
    const [description ,setDescription] = useState('');
    const [Avatar ,setAvatar] =useState('');
    const [Image ,setImages] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('HomeName' ,FosterName);
        formdata.append('Email' ,email);
        formdata.append('Address' ,address);
        formdata.append('Contact' ,contact);
        formdata.append('Descrpition' ,description);
        formdata.append(' Avatar' ,Avatar);
        
        for (let i = 0; i < Image.length; i++) {
            formdata.append('Image', Image[i]);
          }
    
        try{
    const token = localStorage.getItem('token')
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/fosterHome/Add` ,formdata ,
        {
    headers:{
        'Content-Type' : 'multipart/form-data',
         Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(response.data);
          toast.success("foster home successfully registered! 🎉");
    
          sethomeName('');
          setEmail('');
          setAddress('');
          setContact('');
          setAvatar(null);
          setImages(null);
}
    
        catch(error){
            console.log(error);
             toast.error("Registration failed. Please try again. 😢");
    }
}

    return ( 
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
          <Style/>
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-lg glow-border">
        <h1 className="text-3xl font-bold mb-6 text-center">Register a Foster Home</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="FosterHome Name"
            value={FosterName}
            onChange={(e) => sethomeName(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="email"
            placeholder="email"
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
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="text-area"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <div>
            <label className="block mb-1 text-sm font-medium">Avatar Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full text-white file:bg-pink-600 file:border-none file:px-4 file:py-2 file:rounded file:text-sm bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">foster home Images (Multiple)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
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

// /******************************************************************************************************************** */

// export function SearchFosterHome () {
//   const [HomeNames, setHomeName] = useState([]);
//   const [selectedHome, setSelectedHome] = useState(null);
//   //const navigate = useNavigate();

//   // Handle navigation to contact admin page
//   // const handleAdmin = () => {
//   //   if (selectedHome && selectedHome._id) {
//   //     navigate(`/contacthospitaluploader/${selectedHome._id}`);
//   //   }
//   // };


//   // Fetch hospital data on component mount
//   useEffect(() => {
//     const fetchFosterHomes= async () => {
//       try {
//         const response = await axios.post(`${import.meta.env.VITE_API_URL}/fosterHome/Read`);
//         if (response.data && response.data.data.hospitals) {
//           setHomeName(response.data.data.HomeNames);
//           console.log(response.data.data.HomeNames);
//         } else {
//           console.error("No foster home data found in the response");
//         }
//       } catch (error) {
//         console.log("Error fetching homes:", error);
//       }
//     };

//     fetchFosterHomes();
//   }, []);

//   return (
//     <div className="p-6 text-white bg-gray-900 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Available Foster Homes</h1>

//       {/* Hospital Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {HomeNames.length > 0 ? (
//           HomeNames.map((HomeName) => (
//             <div
//               key={HomeNames._id}
//               onClick={() => setSelectedHome(HomeName)}
//               className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
//             >
//               <img
//                 src={
//                   HomeName.imagesH && HomeName.imagesH.length > 0
//                     ? HomeName.imagesH[0]
//                     : "https://via.placeholder.com/150"
//                 }
//                 alt={HomeName.HomeName}
//                 className="w-full h-40 object-cover rounded-t-lg"
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold">{HomeName.HomeName}</h2>
//                 <p className="text-sm text-gray-400">{HomeName.email}</p>
//                 <p className="text-sm">{HomeName.location}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No Foster Home available</p>
//         )}
//       </div>

//       {/* Selected Hospital Details */}
//       {selectedHome && (
//         <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">

//           <div className='flex flex-row gap-3'>
//           <img src={selectedHome.Avatar} alt='foster-image'
//           className="w-16 h-16 border-radius rounded-4xl ring-2 ring-pink-600'" />

//           <h2 className="text-3xl font-bold mb-4">{selectedHome.HomeName}</h2>

          
//           </div>
//           <br />

//           <div className="flex flex-wrap gap-4 mb-4">
//             {selectedHome.Images && selectedHome.Images.length > 0 ? (
//               selectedHome.Images.map((imgUrl, index) => (
//                 <img
//                   key={index}
//                   src={imgUrl}
//                   alt={`foster-image-${index}`}
//                   className="w-40 h-40 object-cover rounded-lg"
//                 />
//               ))
//             ) : (
//               <img
//                 src="https://via.placeholder.com/150"
//                 alt="default"
//                 className="w-40 h-40 object-cover rounded-lg"
//               />
//             )}
//           </div>

//           {/*<h3 className="text-2xl font-semibold">{selectedHospital.hospitalName}</h3>*/}
//           <p className="text-lg">{selectedHome.Address}</p>
//           <p className="text-lg mt-2">{selectedHome.Description}</p>
//           <p className="text-lg mt-2">Help Line Number: {selectedHome.Contact}</p>
//           {/*<p className="text-lg mt-2">Avatar: {selectedHospital.avatarH}</p>*/}
//           {/*<p className="text-lg mt-2">Location: {selectedHospital.location}</p>*/}
//           <p className="text-sm text-gray-400 mt-2">Email: {selectedHome.Email}</p>

//           <button
//             type="button"
//             className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
//             //onClick={handleAdmin}
//           >
//             contact foster home
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// SearchFosterHome.jsx


export function SearchFosterHome() {
  const [HomeNames, setHomeNames] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);

  useEffect(() => {
    const fetchFosterHomes = async () => {
      try {
      
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/fosterHome/Read`);
        if (response.data && response.data.data.HomeNames) {

          setHomeNames(response.data.data.HomeNames);
          console.log(response.data.data.HomeNames)

        } else {
          console.error("No foster home data found in the response");
        }
      } catch (error) {
        console.log("Error fetching homes:", error);
      }
    };

    fetchFosterHomes();
  }, []);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Foster Homes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {HomeNames.length > 0 ? (
          HomeNames.map((home) => (
            <div
              key={home._id}
              onClick={() => setSelectedHome(home)}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <img
                src={home.Image?.[0] || "https://via.placeholder.com/150"}
                alt={home.HomeName}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{home.HomeName}</h2>
                <p className="text-sm text-gray-400">{home.Email}</p>
                <p className="text-sm">{home.Address}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No Foster Home available</p>
        )}
      </div>

      {selectedHome && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={selectedHome.Avatar || "https://via.placeholder.com/60"}
              alt="foster-avatar"
              className="w-16 h-16 rounded-full ring-2 ring-pink-600"
            />
            <h2 className="text-3xl font-bold">{selectedHome.HomeName}</h2>
          </div>

          <div className="flex flex-wrap gap-4 my-4">
            {selectedHome.Image?.length > 0 ? (
              selectedHome.Image.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`foster-image-${index}`}
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

          <p className="text-lg">{selectedHome.Address}</p>
          <p className="text-lg mt-2">{selectedHome.Description}</p>
          <p className="text-lg mt-2">Helpline: {selectedHome.Contact}</p>
          <p className="text-sm text-gray-400 mt-2">Email: {selectedHome.Email}</p>

          <button
            type="button"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
          >
            Contact Foster Home
          </button>
        </div>
      )}
    </div>
  );
}
