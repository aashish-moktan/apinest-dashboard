import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface LoginProps {
  setAuthenticated: (val: boolean) => void;
}

export default function Login({ setAuthenticated }: LoginProps) {
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { setValue: setToken } = useLocalStorage("authToken", undefined);

  const responseGoogle = async (authResult: object) => {
    try {
      const code = (authResult as { code: string }).code;

      // Exchange the authorization code for tokens at your backend
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/google/callback?code=${code}`
      );

      const data = response.data;

      if (data.success) {
        // store token in local storage
        setToken(data.data.authToken);
        console.log("Auth token :: ", data.data.authToken);

        // store user information in context
        setUser({
          name: data.data.name,
          email: data.data.email,
          avatar: data.data.avatar,
        });

        setAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError("Google login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error while requesting Google code: ", err);
      setError("An unexpected error occurred. Try again later.");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div
      className="relative min-h-screen bg-gradient-to-tr from-orange-100 via-pink-200 to-purple-200
  flex justify-center items-center overflow-hidden"
    >
      {/* Background decorative circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-400 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-96 p-10 flex flex-col items-center space-y-6">
        {/* App Logo / Name */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg animate-bounce">
            AN
          </div>
          <h1 className="text-3xl font-bold text-gray-800">API Nest</h1>
        </div>

        {/* Description */}
        <p className="text-center text-gray-500 text-sm">
          Welcome to <span className="font-semibold">API Nest</span>, your
          centralized dashboard for managing APIs. Generate API keys, monitor
          usage, and access all your APIs in one elegant platform.
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.6-1.6-35-5.2-51.8H272v98.1h146.9c-6.4 34.9-25.6 64.6-54.8 84.6v70.3h88.7c51.9-47.9 81.7-118.2 81.7-201.2z"
              fill="#4285f4"
            />
            <path
              d="M272 544.3c73.8 0 135.8-24.4 181-66.2l-88.7-70.3c-24.6 16.5-56.1 26.2-92.3 26.2-70.9 0-131-47.9-152.3-112.2H28.6v70.5C73.9 482.1 166.3 544.3 272 544.3z"
              fill="#34a853"
            />
            <path
              d="M119.7 318.5c-5.9-17.5-9.3-36.2-9.3-55.5s3.4-38 9.3-55.5v-70.5H28.6C10.3 185.2 0 223.1 0 262.9s10.3 77.7 28.6 110.4l91.1-54.8z"
              fill="#fbbc04"
            />
            <path
              d="M272 107.5c39.9 0 75.5 13.7 103.7 40.6l77.7-77.7C407.7 24.7 345.7 0 272 0 166.3 0 73.9 62.2 28.6 155.9l91.1 70.5C141 155.4 201.1 107.5 272 107.5z"
              fill="#ea4335"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="text-gray-400 text-xs text-center mt-4">
          By signing in, you agree to our{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
