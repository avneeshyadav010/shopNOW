import { Navigate } from "react-router-dom";
import { getToken } from "../store/auth";



const ProtectedRouted = ({children}) => {
    const token = getToken();
    if(token)
        return children;
    else
    return <Navigate to='/login' />

}
export default ProtectedRouted;