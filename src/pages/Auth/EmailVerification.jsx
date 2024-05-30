import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { BASE_URL } from '../../config/BaseUrl';
import {toast} from 'react-toastify'

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { token } = queryString.parse(location.search);
    if (token) {
      verifyEmail(token);
    } else {
        setVerificationStatus('error');
        toast.error("Verification failed, Please try again");
    }
  }, [location.search]);
    


  const verifyEmail = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/company/auth/verify?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
        const res = await response.json();
        
      console.log(res);
        if (res.code === 200) {
          toast.success(res.message);
          setVerificationStatus('success');
        }
        else {
            toast.error(res.message);
        }

    } catch (error) {
      console.error('Error verifying email:', error);
      setVerificationStatus('error');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {verificationStatus === 'success' ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 rounded-md mb-4">
          Email verified successfully!
        </div>
      ) : (
        <div className="bg-red-200 text-red-800 px-4 py-2 rounded-md mb-4">
          Error verifying email. Please try again.
        </div>
      )}
      <button
        onClick={handleLoginRedirect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Go to Login
      </button>
    </div>
  );
};

export default EmailVerification;
