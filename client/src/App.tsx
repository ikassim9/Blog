import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home />}></Route>
      <Route path='/users/register' element= {<Register />}></Route>
      <Route path='/users/login' element= {<Login />}></Route>
      <Route path='/users/reset-password' element ={<PasswordReset />}></Route>
      <Route path='/users/forgot-password' element ={<ForgotPassword />}></Route>
    </Routes>
    </BrowserRouter>
  );
}