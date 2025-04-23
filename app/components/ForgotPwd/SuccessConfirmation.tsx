'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

interface SuccessConfirmationProps {
  title?: string;
  message?: string;
}

export default function SuccessConfirmation({
  title = "All done!",
  message = "Your password has been reset.",
}: SuccessConfirmationProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Timed redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router]);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
      ) {
      router.push('/login');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup listener on unmount
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        ref={containerRef}
        className="bg-purple-50 p-8 rounded-lg shadow-sm max-w-md w-full text-center"
      >
        <div className="mx-auto w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-purple-600">{message}</p>
      </div>
    </div>
  );
}