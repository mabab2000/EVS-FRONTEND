import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Shield, Building, MapPin } from 'lucide-react';
// Use Vite's public import for images
const logo = new URL("/src/assets/logo.png", import.meta.url).href;

type SignUpData = {
  name: string
  email: string
  password: string
  confirm: string
}

export default function Login() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Sign in
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Sign up
  const [signup, setSignup] = useState<SignUpData>({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<string | null>(null)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('signin', { email, password })
    navigate('/ocr')
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(null)
    if (!signup.name.trim()) return setErrors('Please enter your name')
    if (!signup.email.includes('@')) return setErrors('Please enter a valid email')
    if (signup.password.length < 6) return setErrors('Password must be at least 6 characters')
    if (signup.password !== signup.confirm) return setErrors('Passwords do not match')
    console.log('signup', signup)
    navigate('/ocr')
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)",
        fontFamily: "'Roboto Slab', serif"
      }}
    >
      {/* Main Container */}
      <div 
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ minHeight: "600px" }}
      >
        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Left Side - Branding */}
          <div 
            className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)" 
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-40 h-40 border border-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center mb-8">
                <img src={logo} alt="EVS Logo" className="w-16 h-16 mr-4" />
                <div>
                  <h1 
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "700" }}
                  >
                    EVS
                  </h1>
                  <p 
                    className="text-lg opacity-90"
                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "400" }}
                  >
                    Electronic Visitor System
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Secure Access</h3>
                    <p className="text-white/80">Advanced security features for visitor management</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Building size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Smart Management</h3>
                    <p className="text-white/80">Streamlined visitor registration and tracking</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">OCR Technology</h3>
                    <p className="text-white/80">Automated document scanning and data extraction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h2 
                  className="text-3xl font-bold mb-2"
                  style={{ 
                    color: "#0072a7",
                    fontFamily: "'Roboto Slab', serif",
                    fontWeight: "700"
                  }}
                >
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {mode === 'signin' 
                    ? 'Sign in to access your EVS dashboard' 
                    : 'Join the EVS platform today'
                  }
                </p>
              </div>

              {/* Error Display */}
              {errors && (
                <div 
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {errors}
                </div>
              )}

              {/* Sign In Form */}
              {mode === 'signin' ? (
                <form onSubmit={handleSignIn} className="space-y-6">
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
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                    className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
                    style={{ 
                      background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "600"
                    }}
                  >
                    Sign In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: "#0072a7",
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: "500"
                      }}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type="text"
                        required
                        value={signup.name}
                        onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Enter your full name"
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
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type="email"
                        required
                        value={signup.email}
                        onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signup.password}
                        onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Create a password (min 6 characters)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
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
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={signup.confirm}
                        onChange={(e) => setSignup({ ...signup, confirm: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105"
                    style={{ 
                      background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "600"
                    }}
                  >
                    Create Account
                  </button>
                </form>
              )}

              {/* Toggle Mode */}
              <div className="mt-8 text-center">
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                  {' '}
                  <button
                    onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                    className="font-medium hover:underline transition-colors"
                    style={{ 
                      color: "#0072a7",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "600"
                    }}
                  >
                    {mode === 'signin' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}