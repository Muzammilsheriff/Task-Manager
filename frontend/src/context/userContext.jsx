import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New State to track loading

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem('token')
        if (!accessToken) {
            setLoading(false); // Set loading to false if no token
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE)
                setUser(response.data);
            }
            catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null); // Set user to null on error
            }finally{
                setLoading(false); // Set loading to false after fetching
            }
        }

        fetchUser();
    },[]);

    const updateUser = (userData) =>{
        setUser(userData);
        localStorage.setItem('token', userData.token)
        setLoading(false); // Set loading to false after updating user
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token')
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider