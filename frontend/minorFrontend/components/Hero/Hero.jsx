//import { Link ,NavLink } from "react-router-dom";

//import Register from "../Register/Register";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();
  return (
    <section className="bg-gray-900 text-slate-100 border-b border-gray-700
 py-20 px-6">
      <div className="w-full h-100 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 mx-20">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Welcome to <span className="text-orange-500">Little Paw's</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
          "Where love meets companionship"
          </p>
          <div className="space-x-4">
          
            <button onClick={() => navigate('/register')} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg" >
              Get Started
            </button>
      
            
            <Link to='/learnmore'>
            <button className="border border-gray-400 hover:border-white text-gray-300 hover:text-white py-2 px-6 rounded-lg">
              Learn More
            </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 ">
          <img
            src="images (1).jpeg" // place your image in `public/images/`
            alt="Hero"
            className="w-[600px] h-[400px] rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

  