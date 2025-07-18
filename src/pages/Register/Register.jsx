import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

export default function Register() {

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  function handleSubmit(values) {
    setLoading(true);
    setSuccess("");
    setError("");
    axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp",values)
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
    name: Yup.string().min(3, "Name must be at least 3 characters").max(25, "Name must be at most 25 characters").required("Name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/, "Password must be minimum eight characters, at least one letter and one number").required("Password is required"),
    age: Yup.number().required("Age is required"),
    phone: Yup.string().matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "Enter a valid phone number").required("Phone is required")
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  return <>
    <div className="max-w-sm mx-auto">
      <h2 className="text-3xl my-4 font-bold">Register</h2>
      
      <form onSubmit={formik.handleSubmit} >
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Your name</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='name' value={formik.values.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </div>
        {formik.touched.name && formik.errors.name && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.name}</span>
        </div>}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Your email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' value={formik.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        {formik.touched.email && formik.errors.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div>}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Your password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' value={formik.values.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aa123456" required />
        </div>
        {formik.touched.password && formik.errors.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div>}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Your phone</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name='phone' value={formik.values.phone} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01234567891" required />
        </div>
        {formik.touched.phone && formik.errors.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.phone}</span>
        </div>}
        <div className="mb-5">
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Your age</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="number" name='age' value={formik.values.age} id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age" required />
        </div>
        {formik.touched.age && formik.errors.age && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.age}</span>
        </div>}

        {success && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Email Created Successfully</span> 
        </div>}
              {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{error}</span> 
        </div>}

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i className="fa fa-spin fa-spinner"></i> : "Submit" }</button>
      </form>
    </div>

  </>
}