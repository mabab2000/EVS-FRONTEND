import { Home, User, FileText, Users, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Use Vite's public import for images
const logo = new URL("/src/assets/logo.png", import.meta.url).href;
const profile = new URL("/src/assets/profile.png", import.meta.url).href;

export default function VerticalSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  
  const navItems = [
    { icon: <Home size={16} />, label: "Dashboard", path: "/ocr" },
    { icon: <User size={16} />, label: "Visitor Desk", path: "/ocr" },
    { icon: <Users size={16} />, label: "Visitor Master", path: "/ocr" },
    { icon: <FileText size={16} />, label: "Template", path: "/ocr" },
    { icon: <FileText size={16} />, label: "Event Master", path: "/ocr" },
    { icon: <User size={16} />, label: "Member Master", path: "/ocr" },
    { icon: <FileText size={16} />, label: "Reports", path: "/report" },
  ];
  const sidebarWidth = collapsed ? 48 : 225;
  return (
    <div
      className="fixed top-0 left-0 h-full z-40 transition-all duration-300"
      style={{ 
        width: `${sidebarWidth}px`,
        backgroundColor: '#0072a7',
        color: 'white'
      }}
    >
      <div className="flex items-center h-12 px-2 relative" style={{ backgroundColor: '#0072a7', borderBottom: '1px solid #005b8a' }}> 
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full shadow transition-colors border z-50"
          style={{ 
            width: 24, 
            height: 24,
            backgroundColor: 'white',
            color: '#0072a7',
            borderColor: '#0072a7'
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#e6f4fa'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'white'}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        <img src={logo} alt="Logo" className={`w-6 h-6 ml-8 ${collapsed ? 'mx-auto' : ''}`} />
        {!collapsed && <span 
          className="text-lg font-bold ml-2" 
          style={{ 
            color: 'white',
            fontFamily: "'Roboto Slab', serif",
            fontWeight: "700"
          }}
        >
          EVS
        </span>}
      </div>
      <nav className="flex flex-col mt-3 space-y-1">
        {navItems.map((item, idx) => (
          <div key={idx}>
            <button
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-3 py-1.5 transition-colors text-left w-full text-sm ${collapsed ? 'justify-center px-0' : ''}`}
              style={{ 
                color: 'white',
                backgroundColor: 'transparent',
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'white';
                (e.target as HTMLButtonElement).style.color = '#0072a7';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.target as HTMLButtonElement).style.color = 'white';
              }}
            >
              {item.icon}
              {!collapsed && <span style={{ fontFamily: "'Roboto Slab', serif" }}>{item.label}</span>}
            </button>
            {/* Small white horizontal line below each nav link */}
            <div 
              className="mx-3 mt-1 mb-1"
              style={{ 
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
            />
          </div>
        ))}
        
        {/* Profile Section - moved to left side */}
        <button 
          className={`flex items-center mt-6 p-3 transition-colors ${collapsed ? 'justify-center' : 'justify-start'}`}
          onClick={() => setShowLogout(!showLogout)}
          style={{ 
            backgroundColor: 'transparent',
            border: 'none'
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'}
        >
          <img src={profile} alt="Profile" className={`rounded-full ${collapsed ? 'w-6 h-6' : 'w-8 h-8'}`} />
          {!collapsed && <span className="ml-2 text-sm" style={{ color: 'white' }}>Profile</span>}
        </button>
        
        {/* Border line and Logout - appears when profile is clicked */}
        {showLogout && (
          <>
            <div 
              className="mx-3 my-2"
              style={{ 
                height: '1px',
                backgroundColor: '#005b8a'
              }}
            />
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 px-3 py-1.5 transition-colors text-left w-full text-sm ${collapsed ? 'justify-center px-0' : ''}`}
              style={{ 
                color: 'white',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'white';
                (e.target as HTMLButtonElement).style.color = '#0072a7';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.target as HTMLButtonElement).style.color = 'white';
              }}
            >
              <LogOut size={16} />
              {!collapsed && <span>Logout</span>}
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
