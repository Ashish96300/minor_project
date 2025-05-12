import { useState ,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Navigate, useNavigate } from "react-router-dom";


export function PutForAdoption() {
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('age', age);
    formData.append('species', species);
    formData.append('gender', gender);
    formData.append('breed', breed);
    formData.append('location', location);
    formData.append('adoptionStatus', adoptionStatus);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/animal/Register`, 
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        },
        
      });
      console.log('data:::', response.data);
      
      toast.success("Animal successfully registered for adoption! 🎉");
      
      // Reset form
      setAge("");
      setSpecies("");
      setBreed("");
      setGender("");
      setLocation("");
      setAdoptionStatus("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again. 😢");
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
  
      <ToastContainer /> 
      <h1 className="text-3xl font-bold mb-4">Put for Adoption</h1>
      <form className="bg-gray-800 p-6 rounded-xl space-y-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          autoFocus
        />
        <input
          placeholder="Species (Dog/Cat etc.)"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="" disabled>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Not confirmed</option>
        </select>
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <select
          value={adoptionStatus}
          onChange={(e) => setAdoptionStatus(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="" disabled>Select adoption status</option>
          <option value="Available">Available</option>
          <option value="Adopted">Adopted</option>
          <option value="Fostered">Fostered</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-white"
        />
        <button type="submit" className="bg-pink-500 hover:bg-pink-600 w-full p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

/********************************************************************************************************************* */




export function AdoptPet() {
  const [animals, setAnimals] = useState([]); // Array to store animals
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedAnimal, setSelectedAnimal] = useState(null); // State to store the selected animal
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/animal/getAnimal`);

        if (response.data && response.data.animals) {
          setAnimals(response.data.animals);
          console.log('aniData', response.data.animals);
        } else {
          console.error("No animals data found in the response");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching animal data:", error);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return <p className="text-white">Loading animals...</p>;
  }

  const handleCardClick = (animal) => {
    setSelectedAnimal(animal);
  };


  const handleContactUploader = () => {

    Navigate(`/contactowner/${selectedAnimal._id}`);
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Animals for Adoption</h1>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <div
              key={animal._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
              onClick={() => handleCardClick(animal)}
            >
              <img
                src={animal.image || "https://via.placeholder.com/150"} 
                alt={animal.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{animal.name}</h2>
                <p className="text-sm text-gray-400">{animal.species}</p>
                <p className="text-sm">{animal.breed}</p>
                <p
                  className={`mt-2 px-2 py-1 rounded-full text-sm ${animal.adoptionStatus === "Available"
                    ? "bg-green-500 text-white"
                    : animal.adoptionStatus === "Adopted"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {animal.adoptionStatus}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No animals available for adoption.</p>
        )}
      </div>

      {/* Show selected animal details */}
      {selectedAnimal && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Animal Details</h2>
          <img
            src={selectedAnimal.image || "https://via.placeholder.com/150"} // Default image if not available
            alt={selectedAnimal.name}
            className="w-64 h-64 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-2xl font-semibold">{selectedAnimal.name}</h3>
          <p className="text-xl text-gray-400">{selectedAnimal.species}</p>
          <p className="text-xl">{selectedAnimal.breed}</p>
          <p className="mt-2 text-lg">{selectedAnimal.description}</p>
          <p className="mt-2 text-lg">Age: {selectedAnimal.age}</p>
          <p className="mt-2 text-lg">Gender: {selectedAnimal.gender}</p>
          <p className="mt-2 text-lg">Location: {selectedAnimal.location}</p>
          <p className="mt-2 text-lg">Uploaded By: {selectedAnimal.uploadedBy.email}</p>

          <p className="mt-2 text-lg">Adoption Status:
            <span className={`px-2 py-1 rounded-full text-sm ${selectedAnimal.adoptionStatus === "Available"
              ? "bg-green-500 text-white"
              : selectedAnimal.adoptionStatus === "Adopted"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-white"
            }`}>
              {selectedAnimal.adoptionStatus}
            </span>
          </p>
          <button
        onClick={handleContactUploader}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
      >
        Contact Uploader
      </button>
        </div>
      )}

   
      
    </div>
  );
}
