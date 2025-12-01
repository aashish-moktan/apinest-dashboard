import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
