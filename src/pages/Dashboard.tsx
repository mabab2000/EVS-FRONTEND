import { useState } from "react";
import { Menu, Lock, Activity, ClipboardList, Users } from "lucide-react";

export default function Dashboard() {
  const [darkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors py-10 px-4">
        {/* Container */}
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </header>

          {/* Top Full-Width Card */}
          <div className="mb-6">
            <div className="p-6 rounded-2xl shadow-md bg-gray-50 dark:bg-gray-700 
                            transition-colors hover:shadow-lg cursor-pointer h-[250px] flex flex-col justify-center items-center">
              <p className="text-gray-600 dark:text-gray-400 text-xl text-center">
                Use our EVS app to manage your attendance process efficiently and securely.
              </p>
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mt-6 text-center">
                1000 Taps
              </h1>
            </div>
          </div>

          {/* Two Side Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Card with 4 mini cards inside */}
            <div className="p-6 rounded-2xl shadow-md bg-gray-50 dark:bg-gray-700 transition-colors">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                
                <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Users</p>
                      <p className="text-gray-600 dark:text-gray-400">1,200 Active</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <ClipboardList className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Today Taps</p>
                      <p className="text-gray-600 dark:text-gray-400">320 Taps</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Activity</p>
                      <p className="text-gray-600 dark:text-gray-400">6 Activities</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <Menu className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Menu</p>
                      <p className="text-gray-600 dark:text-gray-400">Configuration</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

           {/* Right Card with progress bars */}
<div className="p-6 rounded-2xl shadow-md bg-gray-50 dark:bg-gray-700 transition-colors">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    Quick Actions
  </h2>
  <ul className="space-y-6">
    {/* Lock System */}
    <li>
      <div className="flex items-center space-x-3">
        <Lock className="w-5 h-5 text-red-500" />
        <span className="text-gray-900 dark:text-white">Lock System</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-6 mt-2 relative">
        <div
          className="bg-red-500 h-6 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: "70%" }}
        >
          70%
        </div>
      </div>
    </li>

    {/* Manage Users */}
    <li>
      <div className="flex items-center space-x-3">
        <Users className="w-5 h-5 text-blue-500" />
        <span className="text-gray-900 dark:text-white">Manage Users</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-6 mt-2 relative">
        <div
          className="bg-blue-500 h-6 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: "50%" }}
        >
          50%
        </div>
      </div>
    </li>

    {/* View Reports */}
    <li>
      <div className="flex items-center space-x-3">
        <ClipboardList className="w-5 h-5 text-green-500" />
        <span className="text-gray-900 dark:text-white">View Reports</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-6 mt-2 relative">
        <div
          className="bg-green-500 h-6 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: "85%" }}
        >
          85%
        </div>
      </div>
    </li>

    {/* System Activity */}
    <li>
      <div className="flex items-center space-x-3">
        <Activity className="w-5 h-5 text-purple-500" />
        <span className="text-gray-900 dark:text-white">System Activity</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-6 mt-2 relative">
        <div
          className="bg-purple-500 h-6 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: "40%" }}
        >
          40%
        </div>
      </div>
    </li>
  </ul>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
