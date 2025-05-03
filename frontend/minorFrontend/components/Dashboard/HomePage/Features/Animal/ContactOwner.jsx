// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import UserContext from '../../../../../src/context/Usercontext';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Bounce } from 'react-toastify';

// const ContactForm = () => {
//   const { user } = useContext(UserContext); // Get user from context
//   const [message, setMessage] = useState('');
//   const { animalId } = useParams();

//   console.log(user ,message, animalId)
//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.username || !user?.email || !message || !animalId) {
    
//       toast('missing required fields', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//         });
//       return;
//     }

//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/contactowner/${animalId}/email`, {
//         senderName: user.username,
//         senderEmail: user.email,
//         message: message,
//         animalId: animalId,

        
//       });
      

      
//       toast('Email Sent Successfully', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//         });
//       setMessage('');
//     } catch (error) {
//       console.error('Error sending email:', error);
     
//       toast('Failed to send email.', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//         });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-8">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
//         <h1 className="text-3xl font-bold text-center mb-4 text-indigo-400">Contact Form</h1>
//         <p className="text-lg text-center mb-6">Send a message to the uploader:</p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="message" className="block text-lg font-medium text-gray-300">Your Message:</label>
//             <textarea
//               id="message"
//               name="message"
//               value={message}
//               onChange={handleMessageChange}
//               rows="4"
//               className="mt-2 p-3 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="text-sm text-gray-400">
//             <p><strong>Sender Info:</strong></p>
//             <p>Name: {user?.username}</p>
//             <p>Email: {user?.email}</p>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;



