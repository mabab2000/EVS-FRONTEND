import { useState } from "react";
import "../../App.css";

import { Home, User, FileText, Users, Menu, Bell } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar hover collapse

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <User size={20} />, label: "Visitor Desk" },
    { icon: <Users size={20} />, label: "Visitor Master" },
    { icon: <FileText size={20} />, label: "Template" },
    { icon: <FileText size={20} />, label: "Event Master" },
    { icon: <User size={20} />, label: "Member Master" },
    { icon: <FileText size={20} />, label: "Reports" },
  ];

  const sidebarWidth = isCollapsed ? 64 : 256;

  return (
    <>
      {/* Fixed Top Navbar */}
      <div
        className="flex items-center justify-between dark:bg-gray-900 text-white fixed top-0 left-0 right-0 z-40 h-16"
        style={{
          paddingLeft: `${sidebarWidth}px`,
          transition: "padding-left 0.3s ease",
        }}
      >
        <div className="flex items-center">
          <span className="font-bold dark:text-white text-lg">Visit Report</span>
        </div>

        <div className="flex items-center text-balckpx-6 mx-8">
          <div className="relative">
            <Bell
              size={24}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              3
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center px-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={`bg-gray-900 text-white fixed top-0 left-0 h-full transition-all duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:top-0 md:left-0 md:h-screen`}
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <span className={`text-xl font-bold ${isCollapsed ? "hidden" : ""}`}>
            EVS
          </span>
        </div>

        <nav className="flex flex-col mt-4 space-y-2">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              {item.icon}
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="flex items-center justify-center mt-auto p-4 fixed bottom-0 left-0 right-0">
          <img
            src={logo}
            alt="Profile"
            className={`rounded-full ${isCollapsed ? "w-8 h-8" : "w-16 h-16"}`}
          />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        style={{
          marginTop: "64px",
          marginLeft: `${sidebarWidth}px`,
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Page content here */}
      </div>
    </>
  );
}
