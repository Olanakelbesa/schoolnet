'use client';

import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VerificationCodeProps {
  email?: string;
  onSubmit?: (code: string) => void;
  onResend?: () => void;
}

export default function VerificationCode({
  email = 'example@gmail.com',
  onSubmit = () => {},
  onResend = () => {},
}: VerificationCodeProps) {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);
    setError(''); // Clear error on input change

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setCode(digits);
      setError('');
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      setError('Please enter a 4-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    router.push('/forgot-pwd/setpassword');

  };

  const handleResend = () => {
    setError('');
    setIsLoading(true);

    // Simulate resend processing
    setTimeout(() => {
      onResend();
      setCode(['', '', '', '']); // Reset code inputs
      setIsLoading(false);
    }, 500); // Short delay to mimic processing
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 h-screen">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
        <Mail className="w-8 h-8 text-purple-500" />
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Enter your code</h1>
      <p className="text-gray-600 mb-8">
        We sent a code to <span className="font-medium">{email}</span>
      </p>

      <div className="flex flex-col items-center mb-6">
        <div className="flex gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-14 h-14 text-center text-xl border-2 border-purple-300 rounded-md focus:border-purple-500 focus:outline-none disabled:opacity-50"
              aria-label={`Digit ${index + 1}`}
              disabled={isLoading}
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-8">
        Don't receive the email?{' '}
        <button
          onClick={handleResend}
          className="text-purple-600 hover:text-purple-700 focus:outline-none disabled:opacity-50"
          disabled={isLoading}
        >
          Click to resend
        </button>
      </p>

      <Button
        onClick={handleSubmit}
        className="w-1/2 bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white py-2 px-4 rounded-full"
        disabled={isLoading || code.some((digit) => !digit)}
      >
        {isLoading ? 'Verifying...' : 'Continue'}
      </Button>
    </div>
  );
}