import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../service/UserSlice';
import { BASE_URL } from '../../config/BaseUrl';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/company/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formData),
            });

            const res = await response.json();
            
            if (res.code === 200) {
                toast.success('User logged in successfully');
                dispatch(loginSuccess(res.data));
                navigate('/')
            }
            else if (res.code === 400) {
                toast.error(res.message);
            }
            else if (res.code === 401) {
                toast.error(res.message);
            }

            // console.log('LoggedIn successful:', data);

        } catch (error) {
            console.error('LoggedIn error:', error);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-sm text-center underline  text-[#21808f] font-bold mb-4">Welcome to Our Blockchain-Based Crowdfunding Platform</h1>

                    <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {isLoading ? 'Please wait...' : 'Login'}
                        </button>
                        <div className="text-center mt-4">
                            Don't have an account? <Link to="/register" className="text-[#21808f]">Register</Link>
                        </div>
                        <div className="text-center mt-2">
                            <Link to="/forgot-password" className="text-[#21808f]">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
