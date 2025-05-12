import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import Input from '../../components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
import uploadImage from '../../utils/uploadImage'

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [adminInviteCode, setAdminInviteCode] = useState('')
  const [error, setError] = useState(null)
  const{ updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageURL = ''

    if (!fullName) {
      setError('Please enter a full name')
      return
    }

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

    // Signup Api Call
    try {

      // Upload profile image if provided
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageURL = imgUploadRes.imageURL || ''
      }
      console.log(profileImageURL);
      

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profilePic: profileImageURL,
        adminInviteCode
      });

      const { token, role } = response.data

      if(token) {
        localStorage.setItem('token', token)
        updateUser(response.data) 

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin/dashboard')
        }
        else{
          navigate('/user/dashboard')
        }
      }
    }

    catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message)
        } else {
          setError('Something went wrong. Please try again later.')
        }
      }

    };



    return (
      <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-10 flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join us today by enterning your details below
          </p>


          <form onSubmit={handleSignup}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                type="text"
                placeholder="John Doe"
                label="Full Name"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                type="text"
                placeholder="john@example.com"
                label="Email Address"
              />
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
              <Input
                value={adminInviteCode}
                onChange={({ target }) => setAdminInviteCode(target.value)}
                label="Admin Invite Code"
                placeholder="Enter code if you have one"
                type="text"
              />
            </div>
            {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}


            <button type='submit' className='btn-primary'>SIGN UP</button>

            <p className='text-[13px] text-slate-800 mt-4'>
              Already have an Account?{"  "}
              <Link className='underline font-medium text-primary ' to='/login'>
                Login
              </Link>
            </p>
          </form>


        </div>


      </AuthLayout>
    )
  }

  export default SignUp