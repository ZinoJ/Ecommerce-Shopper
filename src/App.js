
import './App.css';
import HomePage from './Pages/home/HomePage';
import {Routes, Route} from 'react-router-dom'
import Header from './Components/Header';
import Registerpage from './Pages/auth/Registerpage';
import ResetPassword from './Pages/auth/ResetPassword';
import Login from './Pages/auth/Login';

function App() {
  return (
    <><Header />
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Registerpage />}/>
      <Route path='/resetpassword' element={<ResetPassword />}/>
    </Routes>
    
    </>
  );
}

export default App;
