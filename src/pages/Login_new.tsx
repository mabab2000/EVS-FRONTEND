import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shield, Building, MapPin } from 'lucide-react';

// Use Vite's public import for images
const logo = new URL("/src/assets/logo.png", import.meta.url).href;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('signin', { email, password });
    navigate('/ocr');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)",
        fontFamily: "'Roboto Slab', serif",
        position: "relative"
      }}
    >
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
          }}
        ></div>
        <div 
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(14,165,233,0.2) 50%, transparent 100%)"
          }}
        ></div>
        <div 
          className="absolute -bottom-40 left-1/3 w-64 h-64 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(37,99,235,0.1) 50%, transparent 100%)"
          }}
        ></div>
        {/* Geometric shapes */}
        <div 
          className="absolute top-1/3 left-10 w-16 h-16 opacity-20 rotate-45"
          style={{
            background: "linear-gradient(45deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)"
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-20 w-12 h-12 opacity-30"
          style={{
            background: "linear-gradient(45deg, rgba(34,197,94,0.4) 0%, rgba(16,185,129,0.2) 100%)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%"
          }}
        ></div>
      </div>

      {/* Main Container - Smaller size */}
      <div 
        className="w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative z-10"
        style={{ 
          maxHeight: "500px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Left Side - Branding */}
          <div 
            className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center text-white relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, #0072a7 0%, #1e40af 25%, #3b82f6 50%, #0ea5e9 75%, #0284c7 100%)",
              position: "relative"
            }}
          >
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0">
              {/* Animated gradient orbs */}
              <div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-20 animate-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  animation: "float 6s ease-in-out infinite"
                }}
              ></div>
              <div 
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-15"
                style={{
                  background: "radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(16,185,129,0.2) 50%, transparent 100%)",
                  animation: "float 8s ease-in-out infinite reverse"
                }}
              ></div>
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 opacity-25"
                style={{
                  background: "linear-gradient(45deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                  borderRadius: "50% 20% 50% 20%",
                  animation: "rotate 10s linear infinite"
                }}
              ></div>
              {/* Geometric patterns */}
              <div className="absolute top-1/4 right-1/4 w-16 h-16 opacity-20">
                <div 
                  className="w-full h-full"
                  style={{
                    background: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                    transform: "rotate(45deg)"
                  }}
                ></div>
              </div>
            </div>

            {/* Add CSS animations */}
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
              }
              @keyframes rotate {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
              }
            `}</style>
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center mb-6">
                <img src={logo} alt="EVS Logo" className="w-12 h-12 mr-3" />
                <div>
                  <h1 
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "700" }}
                  >
                    EVS
                  </h1>
                  <p 
                    className="text-sm opacity-90"
                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "400" }}
                  >
                    Electronic Visitor System
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Secure Access</h3>
                    <p className="text-xs text-white/80">Advanced security features</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Building size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Smart Management</h3>
                    <p className="text-xs text-white/80">Streamlined visitor tracking</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">OCR Technology</h3>
                    <p className="text-xs text-white/80">Automated document scanning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              
              {/* Header */}
              <div className="text-center mb-6">
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ 
                    color: "#0072a7",
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: "700"
                  }}
                >
                  Welcome Back
                </h2>
                <p 
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  Sign in to access your EVS dashboard
                </p>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: "#0072a7",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "500"
                    }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      style={{ 
                        fontFamily: "'Roboto Slab', serif",
                        backgroundColor: "#f8fafc"
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: "#0072a7",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "500"
                    }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      style={{ 
                        fontFamily: "'Roboto Slab', serif",
                        backgroundColor: "#f8fafc"
                      }}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                    />
                    <span 
                      className="ml-2 text-sm text-gray-600"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      Remember me
                    </span>
                  </label>
                  <a 
                    href="#" 
                    className="text-sm hover:underline"
                    style={{ 
                      color: "#0072a7",
                      fontFamily: "'Roboto Slab', serif"
                    }}
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
                  style={{ 
                    background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)",
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: "600"
                  }}
                >
                  Sign In
                </button>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p 
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  Don't have an account?{' '}
                    <a
                    href="#/register"
                    className="font-medium hover:underline transition-colors"
                    style={{ 
                      
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "600",
                      background: "transparent",
                      border: "none",
                      padding: "0",
                      textDecoration: "none"
                    }}
                    >
                    Sign up here
                    </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}