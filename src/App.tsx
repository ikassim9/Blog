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
import NotFoundPage from './components/NotFoundPage';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>

      {/* public routes */}
      <Route path='/' element= {<Home />}></Route>
      <Route path='/users/register' element= {<AnynmousRoute><Register /></AnynmousRoute>}></Route>
      <Route path='/users/login' element= {<AnynmousRoute><Login /></AnynmousRoute>}></Route>
      <Route path='/users/forgot-password' element ={<AnynmousRoute><ForgotPassword /></AnynmousRoute> }></Route>
      <Route path='/posts/:id' element={<PostDetail />}></Route>

         {/* private routes */}
      <Route path='/users/create-post' element= {<PrivateRoute><CreatePost /></PrivateRoute>}></Route>
      <Route path='/posts/:id/edit' element= {<PrivateRoute><EditPost /></PrivateRoute>}></Route>
      <Route path='/users/self' element= {<PrivateRoute><UserProfile /></PrivateRoute>}></Route>

       {/* 404 Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
    </BrowserRouter>
  );
}