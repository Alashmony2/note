import { Navigate } from "react-router-dom";

export default function ProtectRoute({children}) {
  const token = localStorage.getItem("token");
  if(token ==null){
    return <Navigate to="/login"/>
  }
  return (
    <>{children}</>
  )
}
