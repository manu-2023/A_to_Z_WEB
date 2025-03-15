import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Admin from './Components/Admin/Admin';
import Customer from './Components/Customer/Customer';
import Freelancer from './Components/Freelancer/Freelancer';
import { ToastContainer } from 'react-toastify';
import AddFreelancer from './Components/Admin/AddFreelancer';
import ManageCustomer from './Components/Admin/ManageCustomer';
import ViewFeedback from './Components/Admin/ViewFeedback';
import ChangePassword from './Components/Admin/ChangePassword';
import AddCategory from './Components/Admin/AddCategory';
import AddCity from './Components/Admin/AddCity';
import ViewFreelancer from './Components/Customer/ViewFreelancer';
import PostFeedback from './Components/Customer/PostFeedback';
import UpdateCustomer from './Components/Customer/UpdateCustomer';
import BookFreelance from './Components/Customer/BookFreelancer';
import ViewBookings from './Components/Customer/ViewBookings';
import ViewComplaints from './Components/Freelancer/ViewComplaints';
import ViewLog from './Components/Freelancer/ViewLog';
import UpdateFreelancer from './Components/Freelancer/UpdateFreelancer';
import ViewCustomerLog from './Components/Customer/ViewCustomerLog';

export const baseurl = "http://localhost:8080"; 

function App() {
  return (
   <BrowserRouter>
   <ToastContainer/>
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="login" element={<Login />}/>
    <Route path="reg" element={<Registration />}/>

    <Route path="admin" element={<Admin />}>
      <Route path='addcity' element={<AddCity/>} />
      <Route path='addcategory' element={<AddCategory/>} />
      <Route path='addfree' element={<AddFreelancer/>} />
      <Route path='managecustomer' element={<ManageCustomer/>} />
      <Route path='viewfeedback' element={<ViewFeedback/>} />
      <Route path='changepassword' element={<ChangePassword/>} />
      </Route>


    <Route path="customer" element={<Customer />}>
    <Route path='' element={<ViewFreelancer/>} />
    <Route path='feedback' element={<PostFeedback/>} />
    <Route path='booking' element={<BookFreelance/>} />
    <Route path='viewbooking' element={<ViewBookings/>} />
    <Route path='updatecustomer' element={<UpdateCustomer/>} />
    <Route path='viewclog' element={<ViewCustomerLog/>} />

    </Route>

    <Route path="freelancer" element={<Freelancer />}>
    <Route path='viewcmpl' element={<ViewComplaints/>} />
    <Route path='viewlog' element={<ViewLog/>} />
    <Route path='updatefreelancer' element={<UpdateFreelancer/>} />
    </Route>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
