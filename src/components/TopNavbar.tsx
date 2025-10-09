import { Bell, Menu } from "lucide-react";
import { useState } from "react";

export default function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu, if needed
  const sidebarWidth = 225;
  return (
    <div
      className="flex items-center justify-between bg-[#0072a7] text-white fixed top-0 left-0 right-0 z-40 h-12"
      style={{ paddingLeft: `${sidebarWidth}px`, transition: "padding-left 0.3s ease" }}
    >
      <div className="flex items-center">
        <span 
          className="font-bold dark:text-white text-base"
          style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "600" }}
        >
          Visit Report
        </span>
      </div>
      <div className="flex items-center px-4 mx-6">
        <div className="relative">
          <Bell size={18} className="cursor-pointer hover:text-gray-400 transition-colors" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">3</div>
        </div>
      </div>
      <div className="md:hidden flex items-center px-3">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
}
