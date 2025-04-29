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
// HomePage from '../components/Dashboard/HomePage/HomePage.jsx'
import { HomePage } from '../components/Dashboard/HomePage/HomePage.jsx'
import ExplorePage from '../components/Dashboard/HomePage/Features/Animal/Animal.jsx'
import { AdoptPet, PutForAdoption } from '../components/Dashboard/HomePage/Features/Animal/SubFeatures.jsx'
import ExplorePage2 from '../components/Dashboard/HomePage/Features/Hospital/Hospital.jsx'
import ContactForm from '../components/Dashboard/HomePage/Features/Animal/ContactOwner.jsx'


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
      {path:'contactowner/:animalId' , element:<ContactForm/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    
  </StrictMode>,
)
