import { useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserContext from "../../../../../src/context/Usercontext";
import "react-toastify/dist/ReactToastify.css";
import { Style } from "../Style";

const DonationForm = () => {
  const [donationItem, setDonationItem] = useState("");
  const [donationType, setDonationType] = useState("");
  const [message, setMessage] = useState("");
  const [donatedToModel, setDonatedToModel] = useState("Hospital");
  const [donatedTo, setDonatedTo] = useState("");
  const [donationItemImage, setDonationItemImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    if (files.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }
    setDonationItemImage(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("donationItem", donationItem);
    formData.append("donationType", donationType);
    formData.append("message", message);
    formData.append("donatedTo", donatedTo);
    formData.append("donatedToModel", donatedToModel);
  
    donationItemImage.forEach((file) => {
      formData.append("donationItemImage", file);
    });
  
    try {
      const token = localStorage.getItem("token");
  
      // ✅ 1. Submit donation
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/donation/donate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Donation submitted successfully!");
      //const donationId = response.data.data._id;
      try{
     const donationId = response.data.data.donationId; 
      if (donationId) {
       
        await axios.post(
          `${import.meta.env.VITE_API_URL}/givedonation/${donationId}/email`,
          {
            message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      toast.success(`Email Sent To ${donatedTo}`);
    }
    
    catch (error) {

        console.error("Error sending email:", error); 
        toast.error("Failed to send confirmation email.");

      }
    
      setDonationItem("");
      setDonationType("");
      setMessage("");
      setDonatedToModel("Hospital");
      setDonatedTo("");
      setDonationItemImage([]);
    } catch(error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error submitting donation");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <Style/>

      <div className="bg-gray-800/80 backdrop-blur-md text-white rounded-2xl p-8 max-w-xl w-full shadow-lg border border-gray-700 glow-border">
        <h2 className="text-3xl font-bold text-violet-400 mb-6 text-center">👐 Donate an Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Donation Item (e.g., Blankets)"
            value={donationItem}
            onChange={(e) => setDonationItem(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <select
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          >
            <option value="">Select Donation Type</option>
            <option value="Food">Food</option>
            <option value="Medical">Medical</option>
            <option value="Essential">Essential</option>
            <option value="Others">Others</option>
          </select>

          <textarea
            placeholder="Message (Optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <select
            value={donatedToModel}
            onChange={(e) => setDonatedToModel(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl"
          >
            <option value="Hospital">Hospital</option>
            <option value="FosterHome">Foster Home</option>
          </select>

          <input
            type="text"
            placeholder={`Enter ${donatedToModel} name`}
            value={donatedTo}
            onChange={(e) => setDonatedTo(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-white file:bg-violet-600 file:border-none file:px-4 file:py-2 file:rounded file:text-sm bg-gray-700"
            required
          />

          {donationItemImage.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {donationItemImage.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-600"
                />
              ))}
            </div>
          )}

          <div className="text-sm text-gray-400">
            <p><strong>Donor:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>

          <button
            type="submit"
            
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition duration-200"
            
          >
            {loading ? "Submitting..." : "Submit Donation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;

// import { useState } from "react";
// import axios from "axios";
// import { useParams } from 'react-router-dom'; // Import useParams

// const DonationForm = () => {
//   const [donationItem, setDonationItem] = useState("");
//   const [donationType, setDonationType] = useState("");
//   const [message, setMessage] = useState("");
//   const [donatedTo, setDonatedTo] = useState("Hospital");
//   const [donatedToName, setDonatedToName] = useState("");
//   const [senderName, setSenderName] = useState("");
//   const [senderEmail, setSenderEmail] = useState("");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const { donationId } = useParams()// Get donationId from URL

//   const handleFileChange = (e) => {
//     setFiles([...e.target.files]);
//   };

//   // New function to handle sending the email
//   const sendDonationEmail = async () => {
//     try {
//       const emailResponse = await axios.post(
//         `${import.meta.env.VITE_API_URL}/givedonation/${donationId}`, // Use the donationId
//         {
//           message: message, // Include message
//           senderEmail: senderEmail, // Include senderEmail
//         }
//       );
//       console.log("Email sent successfully:", emailResponse.data.message);
//       setSuccessMessage((prev) => prev + " and Email Sent Successfully!"); // Append to existing message
//     } catch (emailError) {
//       console.error("Error sending email:", emailError);
//       setErrorMessage(
//         (prev) => prev + " but Failed to send confirmation email."
//       ); // Append to existing message
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     const formData = new FormData();
//     formData.append("donationItem", donationItem);
//     formData.append("donationType", donationType);
//     formData.append("message", message);
//     formData.append("donatedTo", donatedTo);
//     formData.append("donatedToName", donatedToName);
//     formData.append("senderName", senderName);
//     formData.append("senderEmail", senderEmail);

//     files.forEach((file) => {
//       formData.append("donationItemImage", file);
//     });

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/donation/donate`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setSuccessMessage(response.data.message);

//       // Call the function to send the email
//       await sendDonationEmail(); //  Call sendDonationEmail.

//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white p-6 rounded-2xl max-w-md mx-auto shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">Donate Item</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Donation Item Input */}
//         <input
//           type="text"
//           placeholder="Donation Item (e.g., Blankets)"
//           value={donationItem}
//           onChange={(e) => setDonationItem(e.target.value)}
//           className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
//           required
//         />

//         {/* Donation Type Select */}
//         <select
//           value={donationType}
//           onChange={(e) => setDonationType(e.target.value)}
//           className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
//           required
//         >
//           <option value="">Select Donation Type</option>
//           <option value="Food">Food</option>
//           <option value="Medical">Medical</option>
//           <option value="Essential">Essential</option>
//         </select>

//         {/* Donation Message Input */}
//         <textarea
//           placeholder="Message (Optional)"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
//         />

//         {/* Donated To (Hospital or Foster Home) */}
//         <select
//           value={donatedTo}
//           onChange={(e) => setDonatedTo(e.target.value)}
//           className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
//         >
//           <option value="Hospital">Hospital</option>
//           <option value="FosterHome">Foster Home</option>
//         </select>

//         {/* Donated To Name Input */}
//         <input
//           type="text"
//           placeholder={`Enter ${donatedTo} name`}
//           value={donatedToName}
//           onChange={(e) => setDonatedToName(e.target.value)}
//           className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
//           required
//         />

//         {/* Sender's Name Input */}
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={senderName}
//           onChange={(e) => setSenderName(e.target.value)}
//           className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
//           required
//         />

//         {/* Sender's Email Input */}
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={senderEmail}
//           onChange={(e) => setSenderEmail(e.target.value)}
//           className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
//           required
//         />

//         {/* File Upload Input */}
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full text-sm"
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl font-semibold"
//         >
//           {loading ? "Submitting..." : "Submit Donation"}
//         </button>
//       </form>

//       {/* Success and Error Messages */}
//       {successMessage && (
//         <p className="mt-4 text-green-500 font-semibold">{successMessage}</p>
//       )}
//       {errorMessage && (
//         <p className="mt-4 text-red-500 font-semibold">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default DonationForm;
