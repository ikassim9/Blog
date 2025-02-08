import { Navigate } from "react-router-dom";


// to prevent login user from acess pages such login register etc..
export type props = {
    children : JSX.Element;
  };
  
  export default function AnynmousRoute({children}: props) {
     
    let user =  localStorage.getItem('user');
 
    if(user) {
        return <Navigate to={{ pathname: '/' }} />;
    } else {
        return children
     }
  };