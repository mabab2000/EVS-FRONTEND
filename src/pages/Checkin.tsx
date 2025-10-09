

const CheckInSuccess = () => {
  return (
    <div className="min-h-screen   flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-4xl border border-grey-200 w-full">
        <div className="bg-blue-700  rounded-3xl shadow-xl p-8 transition-colors duration-200">
          {/* Main Content Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Success Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Check In Success!
              </h1>
              
              <div className="text-gray-600 dark:text-gray-300 mb-6 space-y-1">
                <p className="text-lg">Photo has been matched and</p>
                <p className="text-lg">checked in successfully</p>
              </div>
              
              <div className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-2">
                00:03:44 Hrs
              </div>
              
              <div className="text-gray-500 dark:text-gray-400 text-lg">
                20 May 2021
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  alt="Matched photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
      <a href="#/report">Report</a>
    </div>
  );
};

export default CheckInSuccess;