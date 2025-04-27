import React, { useContext } from 'react'
import {Link, NavLink} from 'react-router-dom'
import UserContext from '../../src/context/Usercontext';
import Profile from '../profile/Profile';
import Logout from '../Logout/Logout';

//{!user ? ( <>...</>) : (<>...</>)}

export default function Header() {

    const {user} = useContext(UserContext);
    const handleLogout = Logout();
    return (
          <header className="shadow sticky z-50 top-0">
            <nav className="bg-neutral-900 text-white border-b border-gray-700 shadow px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">                            
                        <img
                            src="paws.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                        <h3 className='text-2xl font-bold font-sans'>Little Paw's</h3>
                    </Link>
                    <div className="flex items-center lg:order-2">

        
                {user?(
                    <div className='flex items-center gap-4'>
            
                    <button
                       
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            onClick={handleLogout}
                        >
                                logout
                    </button>
                    <Link
                        to="#"
                        >
                    </Link>
                        <img src={user.avatar} 
                        alt="avatar" 
                        className='w-14 h-14 border-radius rounded-4xl ring-2 ring-pink-600'/>
        
                        </div>
                    )
                    :
                    (
                        <>
                        <Link
                            to="/login"
                            className="text-white-800 hover:bg-orange-700 focus:ring-4 focus:ring-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>


                        <Link
                            to="/register"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            onChange={(e)=>Profile(e.target.value)}
                        >
                           
                            Get started
                        </Link>
                        </>
                    )
                       }
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/home"
                                end
                                    className={({isActive}) =>
                                        
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/about"
                                    className={({isActive}) =>                  //class in callback bcz user get to know on which page it is
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/contact"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                          
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}