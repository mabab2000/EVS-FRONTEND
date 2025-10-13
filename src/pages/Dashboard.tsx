import { 
  Lock, 
  Activity, 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp,
  Shield,
  Building,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";

export default function Dashboard() {

  const statsData = [
    {
      title: "Total Visitors",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: <Users className="w-6 h-6" />,
      color: "blue"
    },
    {
      title: "Today's Check-ins",
      value: "342",
      change: "+8%",
      trend: "up", 
      icon: <Clock className="w-6 h-6" />,
      color: "green"
    },
    {
      title: "Active Visitors",
      value: "128",
      change: "-3%",
      trend: "down",
      icon: <Activity className="w-6 h-6" />,
      color: "purple"
    },
    {
      title: "Check-out Rate",
      value: "98.2%",
      change: "+0.5%",
      trend: "up",
      icon: <Shield className="w-6 h-6" />,
      color: "orange"
    }
  ];

  const quickActions = [
    {
      title: "Visitor Check-in",
      description: "Register new visitors and manage check-ins",
      icon: <Building className="w-8 h-8" />,
      color: "bg-blue-500",
      progress: 85
    },
    {
      title: "Check-out Management",
      description: "Process visitor check-outs and departures",
      icon: <Lock className="w-8 h-8" />,
      color: "bg-green-500",
      progress: 72
    }
  ];

  return (
    <div 
      className="min-h-screen transition-colors"
      style={{ 
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
        fontFamily: "'Roboto Slab', serif",
        padding: "0.5rem"
      }}
    >
      {/* Container - Full Width */}
      <div 
        className="h-screen rounded-lg shadow-2xl transition-colors"
        style={{ 
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "1rem",
          display: "flex",
          flexDirection: "column"
        }}
      >
        
        {/* Header */}
        <header className="flex justify-between items-center mb-3">
          <div>
            <h1 
              className="text-2xl font-bold mb-1"
              style={{ 
                color: "#0072a7",
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "700"
              }}
            >
              EVS Dashboard
            </h1>
            <p 
              className="text-gray-600 text-sm"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Welcome back! Here's what's happening with your Electronic Visitor System.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div 
              className="px-3 py-1.5 rounded-lg shadow-md"
              style={{ 
                background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)",
                color: "white"
              }}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span style={{ fontFamily: "'Roboto Slab', serif", fontSize: "0.75rem" }}>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section - Reduced Width */}
        <div className="mb-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Compact Hero Card - Left Side */}
            <div 
              className="lg:col-span-2 p-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer relative overflow-hidden"
              style={{ 
                background: "linear-gradient(135deg, #0072a7 0%, #1e40af 25%, #3b82f6 50%, #0ea5e9 75%, #0284c7 100%)",
                minHeight: "100px"
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 right-2 w-12 h-12 border border-white rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white rounded-full"></div>
              </div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p 
                    className="text-white/90 text-sm mb-2"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    Manage your visitor attendance efficiently
                  </p>
                  <a href="#/Checkin" className="group">
                    <div 
                      className="text-3xl font-bold text-white group-hover:scale-105 transition-transform"
                      style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "700" }}
                    >
                      1,247
                    </div>
                    <div 
                      className="text-white/80 text-xs flex items-center"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      Total Check-ins Today
                      <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Summary Card - Right Side */}
            <div 
              className="p-4 rounded-xl shadow-lg"
              style={{ 
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
            >
              <h3 
                className="text-sm font-semibold mb-3"
                style={{ 
                  color: "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "600"
                }}
              >
                Today's Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600" style={{ fontFamily: "'Roboto Slab', serif" }}>Check-ins</span>
                  <span className="text-sm font-bold text-green-600" style={{ fontFamily: "'Roboto Slab', serif" }}>342</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600" style={{ fontFamily: "'Roboto Slab', serif" }}>Check-outs</span>
                  <span className="text-sm font-bold text-orange-600" style={{ fontFamily: "'Roboto Slab', serif" }}>289</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600" style={{ fontFamily: "'Roboto Slab', serif" }}>Currently Inside</span>
                  <span className="text-sm font-bold text-blue-600" style={{ fontFamily: "'Roboto Slab', serif" }}>53</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Compact Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              style={{ 
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="p-2 rounded-lg"
                  style={{ 
                    backgroundColor: stat.color === 'blue' ? '#dbeafe' : 
                                   stat.color === 'green' ? '#dcfce7' :
                                   stat.color === 'purple' ? '#f3e8ff' : '#fed7aa',
                    color: stat.color === 'blue' ? '#1e40af' : 
                           stat.color === 'green' ? '#166534' :
                           stat.color === 'purple' ? '#7c3aed' : '#ea580c'
                  }}
                >
                  {stat.icon}
                </div>
                <div 
                  className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 
                  className="text-xl font-bold mb-1"
                  style={{ 
                    color: "#0072a7",
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: "700"
                  }}
                >
                  {stat.value}
                </h3>
                <p 
                  className="text-gray-600 text-xs"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid - Optimized Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 flex-1">
          
          {/* Quick Actions - Compact */}
          <div 
            className="lg:col-span-2 p-3 rounded-xl shadow-lg"
            style={{ 
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <h2 
              className="text-base font-semibold mb-3"
              style={{ 
                color: "#0072a7",
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "600"
              }}
            >
              Quick Actions
            </h2>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <div 
                  key={index}
                  className="group p-2.5 rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer"
                  style={{ 
                    background: "rgba(248, 250, 252, 0.8)",
                    border: "1px solid rgba(226, 232, 240, 0.8)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.borderColor = "#0072a7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(248, 250, 252, 0.8)";
                    e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)";
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`p-1.5 rounded-lg text-white ${action.color}`}
                        style={{ transform: "scale(0.8)" }}
                      >
                        {action.icon}
                      </div>
                      <div>
                        <h3 
                          className="font-semibold text-gray-900 text-xs"
                          style={{ fontFamily: "'Roboto Slab', serif" }}
                        >
                          {action.title}
                        </h3>
                        <p 
                          className="text-gray-600 text-xs"
                          style={{ fontFamily: "'Roboto Slab', serif" }}
                        >
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span 
                        className="text-xs text-gray-600"
                        style={{ fontFamily: "'Roboto Slab', serif" }}
                      >
                        Progress
                      </span>
                      <span 
                        className="text-xs font-medium"
                        style={{ 
                          color: "#0072a7",
                          fontFamily: "'Roboto Slab', serif"
                        }}
                      >
                        {action.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="h-1 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${action.progress}%`,
                          background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)"
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Performance Overview - Expanded */}
          <div 
            className="lg:col-span-3 p-3 rounded-xl shadow-lg"
            style={{ 
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <h2 
              className="text-base font-semibold mb-3"
              style={{ 
                color: "#0072a7",
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "600"
              }}
            >
              Attendance Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* Left Column - Performance Metrics */}
              <div className="space-y-3">
                <div 
                  className="p-2.5 rounded-lg"
                  style={{ background: "rgba(239, 246, 255, 0.6)" }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span 
                        className="font-medium text-gray-900 text-xs"
                        style={{ fontFamily: "'Roboto Slab', serif" }}
                      >
                        Check-in Success Rate
                      </span>
                    </div>
                    <span 
                      className="text-green-600 font-bold text-xs"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      99.5%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "99.5%" }}
                    ></div>
                  </div>
                </div>

                <div 
                  className="p-2.5 rounded-lg"
                  style={{ background: "rgba(254, 243, 199, 0.6)" }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span 
                        className="font-medium text-gray-900 text-xs"
                        style={{ fontFamily: "'Roboto Slab', serif" }}
                      >
                        Avg. Processing Time
                      </span>
                    </div>
                    <span 
                      className="text-orange-600 font-bold text-xs"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      45s
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-orange-500 h-1.5 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div 
                  className="p-2.5 rounded-lg"
                  style={{ background: "rgba(243, 232, 255, 0.6)" }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Users className="w-3 h-3 text-purple-500" />
                      <span 
                        className="font-medium text-gray-900 text-xs"
                        style={{ fontFamily: "'Roboto Slab', serif" }}
                      >
                        Visitor Satisfaction
                      </span>
                    </div>
                    <span 
                      className="text-purple-600 font-bold text-xs"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      4.8/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-purple-500 h-1.5 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    className="text-center p-2.5 rounded-lg"
                    style={{ background: "rgba(239, 246, 255, 0.6)" }}
                  >
                    <div 
                      className="text-lg font-bold"
                      style={{ 
                        color: "#0072a7",
                        fontFamily: "'Roboto Slab', serif"
                      }}
                    >
                      12h
                    </div>
                    <div 
                      className="text-gray-600 text-xs"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      Avg. Visit Duration
                    </div>
                  </div>
                  <div 
                    className="text-center p-2.5 rounded-lg"
                    style={{ background: "rgba(220, 252, 231, 0.6)" }}
                  >
                    <div 
                      className="text-lg font-bold text-green-600"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      98%
                    </div>
                    <div 
                      className="text-gray-600 text-xs"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      Check-out Rate
                    </div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 gap-2">
                  <div 
                    className="p-2.5 rounded-lg"
                    style={{ background: "rgba(254, 226, 226, 0.6)" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600" style={{ fontFamily: "'Roboto Slab', serif" }}>Peak Hour</span>
                      <span className="text-sm font-bold text-red-600" style={{ fontFamily: "'Roboto Slab', serif" }}>2:00 PM</span>
                    </div>
                  </div>
                  <div 
                    className="p-2.5 rounded-lg"
                    style={{ background: "rgba(219, 234, 254, 0.6)" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600" style={{ fontFamily: "'Roboto Slab', serif" }}>Departments</span>
                      <span className="text-sm font-bold text-blue-600" style={{ fontFamily: "'Roboto Slab', serif" }}>8 Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
