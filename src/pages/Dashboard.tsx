import { useNavigate } from "react-router-dom";

interface DashboardProps {
  setAuthenticated: (auth: boolean) => void;
}

export default function Dashboard({ setAuthenticated }: DashboardProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
