import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import UserContextProvider from "./context/UserContext";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",element:<Layout/>,children:[
        {index:true,element:<Home/>},
        {path:"login",element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"*",element:<NotFound/>},
      ]
    }
  ])

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
    </>
  )
}

export default App
