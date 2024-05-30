import React, { useState } from 'react';
import { BASE_URL } from '../../config/BaseUrl';
import {toast} from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/company/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email}),
            });

            const res = await response.json();
            if (res.code == 200) {
                toast.success("Password reset link has been sent to your registered email.")
            }
            else {
                toast.error(res.message);
            }
            // alert();
         
        } catch (error) {
            console.error('Reset password error:', error);
        } finally {
            setEmail(''); // Clear email input after submission (optional)
            setIsLoading(false);
        }

    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl text-center mb-4">Forgot Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {isLoading?'Please wait...':'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
