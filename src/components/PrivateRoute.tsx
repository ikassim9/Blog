import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { FirebaseAuth } from "../services/FirebaseAuth";
import SkeletonLoader from "./SkeletonLoader";

export type PrivateRouteProps = {
    children : JSX.Element;
  };
  
  export default function PrivateRoute({children}: PrivateRouteProps) {
    const [user, loading] = useAuthState(FirebaseAuth);

    if(loading){
      return <SkeletonLoader />
    }
    if(user) {
      return children;
    } else {
      return <Navigate to={{ pathname: '/' }} />;
    }
  };