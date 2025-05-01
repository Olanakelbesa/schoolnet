'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '@/redux/slices/authSlice'; // Adjust the path as needed
import { RootState, AppDispatch } from '@/redux/store';
import NotificationContainer from './Notification'; // Adjust the path as needed
import Link from 'next/link';

function VerifyEmail() {
  const [notifications, setNotifications] = useState<
    { id: number; message: string; type: 'success' | 'error' | 'warning' | 'info' }[]
  >([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Try multiple possible token parameter names
  const token = searchParams.get('token') || searchParams.get('verificationToken') || null;
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, verificationMessage } = useSelector((state: RootState) => state.auth);

  // Debug query parameters
  useEffect(() => {
    console.log('Search Params:', searchParams.toString());
    console.log('Token:', token);
  }, [searchParams, token]);

  // Generate unique ID for notifications
  const generateId = () => Math.floor(Math.random() * 1000000);

  // Add notification with optional auto-dismiss
  const addNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = generateId();
    setNotifications((prev) => [...prev, { id, message, type }]);
    if (type !== 'error') {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000); // Auto-dismiss after 5 seconds for non-error notifications
    }
  };

  // Remove notification
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Verify email using the token
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        addNotification(
          'No verification token provided. Please check the email link or request a new one.',
          'error'
        );
        return;
      }

      await dispatch(verifyEmail(token));
    };

    verify();
  }, [token, dispatch]);

  // Handle verification result
  useEffect(() => {
    if (error) {
      addNotification(error, 'error');
    }
    if (verificationMessage && !loading) {
      addNotification(verificationMessage, 'success');
      setTimeout(() => {
        router.push('/login'); // Redirect to login after successful verification
      }, 2000); // Delay redirect to show success notification
    }
  }, [error, verificationMessage, loading, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Notifications */}
      <NotificationContainer notifications={notifications} onClose={removeNotification} />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {loading ? (
          <h1 className="text-2xl font-bold text-gray-800">Verifying your email...</h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Verification</h1>
            {notifications.length > 0 && notifications[0].type === 'success' ? (
              <p className="text-gray-600">
                Your email has been verified. You will be redirected to the login page shortly.
              </p>
            ) : (
              <p className="text-gray-600">
                {notifications[0]?.message || 'Processing verification...'}
              </p>
            )}
            <Link
              href="/login"
              className="mt-4 inline-block text-[#B188E3] font-bold hover:underline"
            >
              Back to Login
            </Link>
            {!loading && !verificationMessage && (
              <button
                onClick={() => {
                  const email = prompt('Enter your email to resend verification:');
                  if (email) {
                    // Placeholder for resend logic; implement resendVerification thunk
                    addNotification('Resend verification email requested.', 'info');
                  }
                }}
                className="mt-4 text-[#B188E3] font-bold hover:underline"
              >
                Resend Verification Email
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;