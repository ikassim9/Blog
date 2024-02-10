import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from '../src/pages/Home';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home />}></Route>
      <Route path='/users/register' element= {<Register />}  > </Route>
    </Routes>
    </BrowserRouter>
  );
}