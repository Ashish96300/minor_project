import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
        formdata.append('HomeName' ,contact);
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
        Authentication:`Bearer(${token}`,
            },
        }
    );
    console.log(response.data);
          toast.success("Hospital successfully registered! 🎉");
    
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
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register a Hospital</h1>
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
            <label className="block mb-1 text-sm font-medium">Hospital Images (Multiple)</label>
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

