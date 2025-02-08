import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CreatePost from './pages/CreatePost';
import PrivateRoute from './components/PrivateRoute';
import PostDetail from './pages/PostDetail';
import UserProfile from './pages/UserProfile';
import EditPost from './pages/EditPost';
import AnynmousRoute from './components/AnonymousRoute';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home />}></Route>
      <Route path='/users/register' element= {<AnynmousRoute><Register /></AnynmousRoute>}></Route>
      <Route path='/users/login' element= {<AnynmousRoute><Login /></AnynmousRoute>}></Route>
      <Route path='/users/forgot-password' element ={<AnynmousRoute><ForgotPassword /></AnynmousRoute> }></Route>
      <Route path='/posts/:id' element={<PostDetail />}></Route>
      <Route path='/users/create-post' element= {<PrivateRoute><CreatePost /></PrivateRoute>}></Route>
      <Route path='/posts/:id/edit' element= {<PrivateRoute><EditPost /></PrivateRoute>}></Route>
      <Route path='/users/:id' element= {<UserProfile />}></Route>
    </Routes>
    </BrowserRouter>
  );
}