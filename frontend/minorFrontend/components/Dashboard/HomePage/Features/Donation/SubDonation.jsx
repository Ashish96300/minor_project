// // 

// import { useState } from "react";
// import axios from "axios";

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

//   const handleFileChange = (e) => {
//     setFiles([...e.target.files]);
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
//       formData.append("files", file);
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

import { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'; // Import useParams

const DonationForm = () => {
  const [donationItem, setDonationItem] = useState("");
  const [donationType, setDonationType] = useState("");
  const [message, setMessage] = useState("");
  const [donatedTo, setDonatedTo] = useState("Hospital");
  const [donatedToName, setDonatedToName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { donationId } = useParams()// Get donationId from URL

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // New function to handle sending the email
  const sendDonationEmail = async () => {
    try {
      const emailResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/givedonation/${donationId}`, // Use the donationId
        {
          message: message, // Include message
          senderEmail: senderEmail, // Include senderEmail
        }
      );
      console.log("Email sent successfully:", emailResponse.data.message);
      setSuccessMessage((prev) => prev + " and Email Sent Successfully!"); // Append to existing message
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      setErrorMessage(
        (prev) => prev + " but Failed to send confirmation email."
      ); // Append to existing message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("donationItem", donationItem);
    formData.append("donationType", donationType);
    formData.append("message", message);
    formData.append("donatedTo", donatedTo);
    formData.append("donatedToName", donatedToName);
    formData.append("senderName", senderName);
    formData.append("senderEmail", senderEmail);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/donation/donate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage(response.data.message);

      // Call the function to send the email
      await sendDonationEmail(); //  Call sendDonationEmail.

    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl max-w-md mx-auto shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Donate Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Donation Item Input */}
        <input
          type="text"
          placeholder="Donation Item (e.g., Blankets)"
          value={donationItem}
          onChange={(e) => setDonationItem(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
          required
        />

        {/* Donation Type Select */}
        <select
          value={donationType}
          onChange={(e) => setDonationType(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
          required
        >
          <option value="">Select Donation Type</option>
          <option value="Food">Food</option>
          <option value="Medical">Medical</option>
          <option value="Essential">Essential</option>
        </select>

        {/* Donation Message Input */}
        <textarea
          placeholder="Message (Optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
        />

        {/* Donated To (Hospital or Foster Home) */}
        <select
          value={donatedTo}
          onChange={(e) => setDonatedTo(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
        >
          <option value="Hospital">Hospital</option>
          <option value="FosterHome">Foster Home</option>
        </select>

        {/* Donated To Name Input */}
        <input
          type="text"
          placeholder={`Enter ${donatedTo} name`}
          value={donatedToName}
          onChange={(e) => setDonatedToName(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
          required
        />

        {/* Sender's Name Input */}
        <input
          type="text"
          placeholder="Your Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
          required
        />

        {/* Sender's Email Input */}
        <input
          type="email"
          placeholder="Your Email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-xl"
          required
        />

        {/* File Upload Input */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl font-semibold"
        >
          {loading ? "Submitting..." : "Submit Donation"}
        </button>
      </form>

      {/* Success and Error Messages */}
      {successMessage && (
        <p className="mt-4 text-green-500 font-semibold">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-500 font-semibold">{errorMessage}</p>
      )}
    </div>
  );
};

export default DonationForm;
