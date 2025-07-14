"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('resumeai_user');
      if (user) {
        router.replace('/dashboard');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl h-[520px] flex rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: White with Image */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          <Image
            src="/illiution.png"
            alt="Login Illustration"
            width={320}
            height={320}
            className="object-contain"
          />
        </div>
        {/* Right: Blue with Login Form */}
        <div className="w-1/2 bg-blue-600 flex items-center justify-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full border-4 border-blue-400 opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full border-4 border-blue-300 opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none" />
          <div className="relative z-10 w-full max-w-sm">
            <div className="bg-white rounded-xl shadow-lg px-8 py-10">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Hello!</h2>
              <p className="mb-6 text-gray-500">Sign Up to Get Started</p>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                if(email) {
                  localStorage.setItem('resumeai_user', email);
                }
                router.push('/dashboard');
              }}>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </form>
              <div className="mt-4 text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
