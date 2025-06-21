import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

export default function Login() {

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  function handleSubmit(values) {
    setLoading(true);
    setSuccess("");
    setError("");
    axios.post("https://note-sigma-black.vercel.app/api/v1/users/signIn",values)
      .then(({data}) => {
        setLoading(false);
        setSuccess(data.msg);
      })
      .catch((error) => {
        
        setLoading(false);
        setError(error.response.data.msg);
      })
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/, "Password must be minimum eight characters, at least one letter and one number").required("Password is required"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  return <>
    <div className="max-w-sm mx-auto">
      <h2 className="text-3xl my-4 font-bold">Login</h2>
      
      <form onSubmit={formik.handleSubmit} >
        
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' value={formik.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        {formik.touched.email && formik.errors.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div>}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' value={formik.values.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        {formik.touched.password && formik.errors.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div>}
        

        {success && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">{success}</span> 
        </div>}
              {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{error}</span> 
        </div>}

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i className="fa fa-spin fa-spinner"></i> : "Submit" }</button>
      </form>
    </div>

  </>
}
