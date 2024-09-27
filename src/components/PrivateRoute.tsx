import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { FirebaseAuth } from "../services/FirebaseAuth";

export type PrivateRouteProps = {
    children : JSX.Element;
  };
  
  export default function PrivateRoute({children}: PrivateRouteProps) {
    const [user] = useAuthState(FirebaseAuth,);

    if(user) {
      return children;
    } else {
      return <Navigate to={{ pathname: '/' }} />;
    }
  };