import AuthLayout from '../../components/Layouts/AuthLayout'
import { React, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import  {UserContext}  from '../../context/userContext';
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const{ updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!password) {
      setError('Please enter the password')
      return
    }
    if (password.length < 8) {
      setError('Password should be at least 8 characters long')
      return
    }

    setError('')

    // Login Api Call
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const { token, role } = res.data
      

      if (token) {
        localStorage.setItem('token', token)
        updateUser(res.data) // Assuming you have a function to update user context

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin/dashboard')
        }
        else if (role === 'member') {
          navigate('/user/dashboard')
        }

      }
    }

    catch (error) {
      if (error.response && error.response.data.message ) {
        setError(error.response.data.message)
      } else {
        setError('Something went wrong. Please try again later.')
      }
    }

  }


return <AuthLayout>
  <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
    <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
    <p className='text-sm text-slate-700 mt-[5px] mb-6'>Please enter your details to login </p>

    <form onSubmit={handleLogin}>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="john@example.com"
        label="Email Address"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeholder="Min 8 characters"
        type="password"
      />

      {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}


      <button type='submit' className='btn-primary'>LOGIN</button>

      <p className='text-[13px] text-slate-800 mt-4'>
        Don't Have an Account?{"  "}
        <Link className='underline font-medium text-primary ' to='/signup'>
          SignUp
        </Link>
      </p>
    </form>

  </div>
</AuthLayout>
}

export default Login