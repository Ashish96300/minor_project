
import { Outlet} from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import UserContexProvider from "./context/Usercontextprovider"
import { Bounce } from "react-toastify"
import { ToastContainer  } from "react-toastify"
function App() {
 

  return (
    <>
      <UserContexProvider>
    
      <Header/>
      <Outlet/>
      <Footer/>

      </UserContexProvider>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
    </>
  )
}

export default App
