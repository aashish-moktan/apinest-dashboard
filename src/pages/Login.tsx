import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {
  setAuthenticated: (val: boolean) => void;
}

export default function Login({ setAuthenticated }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setAuthenticated(true);
    navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    try {
      const { data: authUrl } = await axios.get(
        "http://localhost:5000/auth/google/url"
      );
      const width = 500,
        height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      const popup = window.open(
        authUrl,
        "Google Login",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const messageListener = (event: MessageEvent) => {
        if (event.origin !== "http://localhost:5000") return;
        console.log("User info:", event.data);
        setAuthenticated(true);
        navigate("/dashboard");
        popup?.close();
        window.removeEventListener("message", messageListener);
      };

      window.addEventListener("message", messageListener);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
