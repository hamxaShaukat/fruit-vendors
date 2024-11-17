"use client";

import { ChangeEvent, useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { signInUser } from "@/firebase/authHelpers";
import { useRouter } from "next/navigation";

const { auth } = FirebaseConfig();

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInUser(email, password);
      setError("");
      setLoading(false);
      router.push("/dashboard"); // Navigate to dashboard
    } catch (err) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 sm:py-8">
      <div className="relative max-w-xs w-full mx-auto px-4 sm:max-w-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-2xl sm:rounded-3xl"></div>
        <div className="relative px-6 py-8 bg-white shadow-lg rounded-2xl sm:rounded-3xl">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-semibold capitalize bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Sign in to S.R farm manager
            </h1>
          </div>
          {error && (
            <p className="text-red-500 p-4 border border-red-500 bg-red-100 text-sm mt-2">
              {error}
            </p>
          )}

          <div className="mt-6 space-y-4">
            <div className="relative">
              <input
                value={email}
                onChange={handleEmailChange}
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                placeholder="Email address"
                disabled={loading} // Disable input during loading
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
              >
                Email Address
              </label>
            </div>
            <div className="relative">
              <input
                value={password}
                onChange={handlePasswordChange}
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500"
                placeholder="Password"
                disabled={loading} // Disable input during loading
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            <div className="relative mt-4">
              <button
                onClick={handleSignIn}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2 transition-colors flex items-center justify-center"
                disabled={loading} // Disable button during loading
              >
                {loading ? ( // Show spinner when loading
                  <span className="flex items-center cursor-wait">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                      ></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
