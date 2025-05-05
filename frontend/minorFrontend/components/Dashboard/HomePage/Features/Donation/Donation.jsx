import { useNavigate } from "react-router-dom";


export default function DonationPage() {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Explore Your Options</h1>
        <p className="mb-8 text-lg text-gray-300">
          Choose an option below to get started.
        </p>

        <div className="space-y-4">
       < button
            type="button"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
            
            onClick={() => navigate('/donation/form')}
          >
            Make a Donation
          </button>
        </div>
      </div>
    </div>
  );
}
