
import './App.css';
import HomePage from './Pages/home/HomePage';
import {Routes, Route} from 'react-router-dom'
import Header from './Components/Header';
import Registerpage from './Pages/auth/Registerpage';
import ResetPassword from './Pages/auth/ResetPassword';
import Login from './Pages/auth/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from './Pages/admin/Admin';
import ProductDetails from './Components/product/ProductDetails';
import Cart from './Pages/cart/Cart';
import CheckoutDetails from './Pages/checkout/CheckoutDetails';
import Checkout from './Pages/checkout/Checkout';
import CheckoutSuccess from './Pages/checkout/CheckoutSuccess';
import Orders from './Pages/orderHistory/Orders';
import OrderDetails from './Pages/orderHistory/OrderDetails';
import ReviewProducts from './Components/ReviewProducts';
import Contact from './Pages/contact/Contact';
import NotFound from './Pages/notFound/NotFound';

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
      <Route path='/contact' element={<Contact />}/>
      <Route path='/product_details/:id' element={<ProductDetails />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/checkout_details' element={<CheckoutDetails />}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout_success' element={<CheckoutSuccess/>}/>
      <Route path='/order_history' element={<Orders/>}/>
      <Route path='/order_details/:id' element={<OrderDetails/>}/>
      <Route path='/review_product/:id' element={<ReviewProducts/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    
    </>
  );
}

export default App;
