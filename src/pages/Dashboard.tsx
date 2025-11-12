import React, { useState } from "react";
import {
  ClipboardIcon,
  PlusIcon,
  CheckIcon,
  HomeIcon,
  Cog6ToothIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../hooks/useUser";

interface Api {
  name: string;
  description: string;
  requestsMade: number;
  requestsLimit: number;
}

const mockApis: Api[] = [
  {
    name: "Weather API",
    description: "Get current weather data",
    requestsMade: 120,
    requestsLimit: 500,
  },
  {
    name: "News API",
    description: "Latest news headlines",
    requestsMade: 50,
    requestsLimit: 200,
  },
  {
    name: "Crypto API",
    description: "Cryptocurrency prices",
    requestsMade: 300,
    requestsLimit: 1000,
  },
];

interface DashboardProps {
  setAuthenticated: (val: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuthenticated }) => {
  const [apiKey, setApiKey] = useState("abcd-1234-efgh-5678");
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useUser();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const newKey = Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {sidebarOpen && <h2 className="font-bold text-lg">APINest</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <HomeIcon className="w-6 h-6 text-gray-600" />
              {sidebarOpen && (
                <span className="ml-3 text-gray-800 font-medium">
                  Dashboard
                </span>
              )}
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <ServerIcon className="w-6 h-6 text-gray-600" />
              {sidebarOpen && (
                <span className="ml-3 text-gray-800 font-medium">APIs</span>
              )}
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
              {sidebarOpen && (
                <span className="ml-3 text-gray-800 font-medium">Settings</span>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hello, {user && user.name}!</span>
            <img
              src={(user ? user.avatar : "") || ""}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* API Usage Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm">Total APIs</h2>
            <p className="text-2xl font-bold mt-2">{mockApis.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm">Requests Made</h2>
            <p className="text-2xl font-bold mt-2">
              {mockApis.reduce((acc, api) => acc + api.requestsMade, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm">Request Limit</h2>
            <p className="text-2xl font-bold mt-2">
              {mockApis.reduce((acc, api) => acc + api.requestsLimit, 0)}
            </p>
          </div>
        </section>

        {/* API Key Section */}
        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Your API Key
            </h2>
            <button
              onClick={handleGenerateKey}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Generate New
            </button>
          </div>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <span className="font-mono text-gray-700">{apiKey}</span>
            <button
              onClick={handleCopyKey}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              {copied ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <ClipboardIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </section>

        {/* APIs List */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Available APIs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockApis.map((api) => (
              <div
                key={api.name}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {api.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{api.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${(api.requestsMade / api.requestsLimit) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm">
                  {api.requestsMade} / {api.requestsLimit} requests used
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
