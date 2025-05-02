import { Link } from "react-router-dom";
//import { Camera, Hospital, Icon, PawPrint } from 'lucide-react';
//import { burger } from '@lucide/lab';
//import { DynamicIcon } from 'lucide-react/dynamic';
//<DynamicIcon name="hospital" size={48} color="brown" />
//<Hospital size={32} color="blue"/>
import Profile from "../../profile/Profile";
import UserContext from "../../../src/context/Usercontext";
//import { useContext } from "react";


export function HomePage() {
  //const {user} = useContext(UserContext)
  //console.log(user.fullName)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
          
          {/* 🐾 Animals */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-2">🐾 Animals</h2>
            <p>Adopt a pet or put an animal for adoption</p>
            <Link to="/explore">
              <button className="mt-4 bg-pink-500 hover:bg-pink-600 p-3 rounded-xl w-full font-semibold transition-all">
                Explore Animals
              </button>
            </Link>
          </div>
  
          {/* 🏥 Hospitals */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-2">🏥 Hospitals </h2>
            <p>Find a hospital or register one</p>
            <Link to="/hospital">
              <button className="mt-4 bg-pink-500 hover:bg-pink-600 p-3 rounded-xl w-full font-semibold transition-all">
                Explore Hospitals
              </button>
            </Link>
          </div>
  
          {/* 🏡 Foster Homes */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-2">🏡 Foster Homes</h2>
            <p>Find a foster home or register your own</p>
            <Link to="/fosterhome">
              <button className="mt-4 bg-pink-500 hover:bg-pink-600 p-3 rounded-xl w-full font-semibold transition-all">
                Explore Foster Homes
              </button>
            </Link>
          </div>
  
          {/* 💖 Donations */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-2">💖 Donations</h2>
            <p>Make a donation and support the cause</p>
            <Link to="/donations">
              <button className="mt-4 bg-pink-500 hover:bg-pink-600 p-3 rounded-xl w-full font-semibold transition-all">
                Explore Donations
              </button>
            </Link>
          </div>
  
          {/* ☎️ Emergency Hotline */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-center md:col-span-2">
            <h2 className="text-3xl font-bold mb-2">☎️ Emergency Hotline</h2>
            <p>Need immediate help? Here are the numbers</p>
            <Link to="/emergency-hotline">
              <button className="mt-4 bg-pink-500 hover:bg-pink-600 p-3 rounded-xl w-full font-semibold transition-all">
                Explore Emergency Hotlines
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    );
  }