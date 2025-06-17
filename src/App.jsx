import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';

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
      <RouterProvider router={router}/>
    </>
  )
}

export default App
