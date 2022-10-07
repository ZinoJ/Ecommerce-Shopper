
import './App.css';
import HomePage from './Pages/home/HomePage';
import {Routes, Route} from 'react-router-dom'
import Header from './Components/Header';
import Registerpage from './Pages/auth/Registerpage';
import ResetPassword from './Pages/auth/ResetPassword';
import Login from './Pages/auth/Login';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from './Pages/admin/Admin';

function App() {
  return (
    <>
    <ToastContainer />
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Registerpage />}/>
      <Route path='/resetpassword' element={<ResetPassword />}/>
      <Route path='/admin/*' element={<Admin />}/>
    </Routes>
    
    </>
  );
}

export default App;
