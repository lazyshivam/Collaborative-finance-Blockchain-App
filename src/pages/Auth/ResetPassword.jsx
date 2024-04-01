import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config/BaseUrl';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
   
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = queryString.parse(window.location.search);
        const resetToken = urlParams.token;
        if (resetToken) {
            setToken(resetToken);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password !== newPassword) {
                alert("Passwords do not match");
                throw new Error('Passwords do not match');
            }

            const response = await fetch(`${BASE_URL}/v1/auth/reset-password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: password }),
            });

            if (!response.ok) {
                throw new Error(`Password reset failed with status: ${response.status}`);
            }

            alert("Password successfully reset");
            navigate('/');

        } catch (error) {
            console.error('Reset password error:', error);
        }

        setNewPassword('');
        setPassword('');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl text-center mb-4">Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">New Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                minLength={8}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="npassword">Confirm Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                id="npassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                required
                                minLength={8}
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
