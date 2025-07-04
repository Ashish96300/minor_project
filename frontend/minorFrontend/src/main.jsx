import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Home from '../components/Home/Home.jsx'
import About from '../components/About/About.jsx'
import Hero from '../components/Hero/Hero.jsx'
import Login from '../components/Login/Login.jsx'
import Register from '../components/Register/Register.jsx'
import Contact from '../components/Contact/contact.jsx'
import LearnMore from '../components/learnMore/learnMore.jsx'
import Logout from '../components/Logout/Logout.jsx'
//import HomePage from '../components/Dashboard/HomePage/HomePage.jsx'
import { HomePage } from '../components/Dashboard/HomePage/HomePage.jsx'
import ExplorePage from '../components/Dashboard/HomePage/Features/Animal/Animal.jsx'
import { AdoptPet, PutForAdoption } from '../components/Dashboard/HomePage/Features/Animal/SubFeatures.jsx'
import ExplorePage2 from '../components/Dashboard/HomePage/Features/Hospital/Hospital.jsx'
import ContactForm from '../components/Dashboard/HomePage/Features/Animal/ContactOwner.jsx'
import { RegisterHospital } from '../components/Dashboard/HomePage/Features/Hospital/SubHospital.jsx'
import { RegisterFosterHome } from '../components/Dashboard/HomePage/Features/FosterHome/SubFosterHome.jsx'
import ExplorePage3 from '../components/Dashboard/HomePage/Features/FosterHome/FosterHome.jsx'
import { SearchHospital } from '../components/Dashboard/HomePage/Features/Hospital/SubHospital.jsx'
import ContactAdmin from '../components/Dashboard/HomePage/Features/Hospital/ContactAdmin.jsx'
import DonationPage from '../components/Dashboard/HomePage/Features/Donation/Donation.jsx'
import DonationForm from '../components/Dashboard/HomePage/Features/Donation/SubDonation.jsx'
import ExplorePage5 from '../components/Dashboard/HomePage/Features/Emergency/Emergency.jsx'
import {EmergencyForm ,EmergencyList}from '../components/Dashboard/HomePage/Features/Emergency/SubEmergency.jsx'
import { SearchFosterHome } from '../components/Dashboard/HomePage/Features/FosterHome/SubFosterHome.jsx'
import UpdateProfile from '../components/Profileupdate/Profileupadtion.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      { path: '', element: <Hero /> },
      {path:"home" , element:<Home/>},
      {path:"about" ,element:<About/>},
      {path:"login" ,element:<Login/>},
      {path:"register" ,element:<Register/>},
      {path:'contact' ,element:<Contact/>},
      {path:'learnmore' ,element:<LearnMore/>},
      {path:'homepage' ,element:<HomePage/>},
      {path:'explore' ,element:<ExplorePage/>},
      {path:'putforadoption',element:<PutForAdoption/>},
      {path:'adoptpet', element:<AdoptPet/>},
      {path:'hospital' ,element:<ExplorePage2/>},
      {path:'contactowner/:animalId' , element:<ContactForm/>},
      {path:'registerhospital' ,element:<RegisterHospital/>},
      {path:'fosterhome' ,element:<ExplorePage3/>},
      {path:'registerhome' ,element:<RegisterFosterHome/>},
      {path:'gethospitals' ,element:<SearchHospital/>},
      {path:'contacthospitaluploader/:hospitalId' ,element:<ContactAdmin/>},
      { path: 'donation', element: <DonationPage /> },
      { path: 'donation/form', element: <DonationForm /> },
      { path:"givedonation/:donationId" ,element:<DonationForm />},
      {path:'emergency' ,element:<ExplorePage5/>},
      {path:'emergency/form' ,element:<EmergencyForm/>},
      {path:'emergency/list' ,element:<EmergencyList/>},
      {path:'searchfosterhome' ,element:<SearchFosterHome/>},
      {path:'updatedetails' ,element:<UpdateProfile/>},
      {path:'logout' ,element:<Logout/>},

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
