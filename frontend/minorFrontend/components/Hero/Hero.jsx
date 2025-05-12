//import { Link ,NavLink } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";
import { Dog } from "lucide-react";
import AnimalNews from "../News/News";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-900 text-slate-100 border-b border-gray-700 py-20 px-6" >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-30">
        {/* Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 px-4 flex flex-col items-start -ml-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            Welcome to <span className="text-orange-500">Little Paw's</span>
          </h1>
          <h3 className="text-xl text-orange-300 font-medium mb-2">
            Where Love Meets Companionship
          </h3>
          
          <p className="text-base md:text-lg text-gray-300 mb-6">
            Your trusted companion platform for finding and helping adorable little paws.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Get Started
            </button>

            <Link to="/learnmore">
              <button className="border border-gray-400 hover:border-white text-gray-300 hover:text-white py-2 px-6 rounded-lg transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 px-4">
          <img
            src="hii.png"
            alt="Hero"
            className="w-full max-w-[600px] h-[430px] rounded-xl shadow-2xl object-cover transition duration-500 ease-in-out hover:scale-105 glow-border"
          />
        </div>
      </div>
    <AnimalNews/>
      {/* Social Media Icons */}
    

      {/* Glow Border Animation */}
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 5px #ff6600, 0 0 25px #ff6600;
            }
            50% {
              box-shadow: 0 0 15px #ff6600, 0 0 50px #ff6600;
            }
          }
          .glow-border {
            animation: glow 2s infinite ease-in-out;
          }
        `}
      </style>
    </section>
  );
}
