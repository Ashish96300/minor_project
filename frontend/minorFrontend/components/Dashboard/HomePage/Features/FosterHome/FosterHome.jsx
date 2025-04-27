import { Link } from "react-router-dom";

export default function ExplorePage2() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Explore Your Options</h1>
        <p className="mb-8 text-lg text-gray-300">
          Choose an option below to get started.
        </p>

        <div className="space-y-4">
          <Link
            to="#"
            className="bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white px-6 py-3 rounded-full block w-full font-semibold"
          >
            Register a Foster Home
          </Link>
          <Link
            to="#"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white px-6 py-3 rounded-full block w-full font-semibold"
          >
            Your Nearby Foster Home
          </Link>
        </div>
      </div>
    </div>
  );
}
