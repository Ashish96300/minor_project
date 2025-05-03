import { useState } from "react";
import axios from 'axios'
//import { registerUser } from "../../../../backend/src/controllers/user.controller";
import { toast, ToastContainer } from 'react-toastify';
import { Bounce } from 'react-toastify';


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    
    const handleSubmit =async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('username',username)
        formData.append('email',email)
        formData.append('fullName', fullName);
        formData.append('password', password);
        formData.append('avatar', avatar);


        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`,
                formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data',

                    },
                }
            );
            console.log('registred',response.data)
            //alert("Registration successful!");
            toast.success('🦄 Registreddddddd!', {
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

        } catch (error) {
            console.log(error)
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
                        <label className="block text-gray-600">Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {avatar && (
                            <div className="w-30 h-30 object-cover rounded-full mx-auto">
                                <img src={URL.createObjectURL(avatar)} 
                                alt="Avatar Preview"
                                className="w-full h-full object-cover rounded-full border-2 mt-2 border-pink-600" 
                                />

                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        
                        
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            
                        > 
                            Register
                        </button>
                        
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-700">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
