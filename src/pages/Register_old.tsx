import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Building, Briefcase, Check, ChevronLeft, ChevronRight } from 'lucide-react';

// Use Vite's public import for images
const logo = new URL("/src/assets/logo.png", import.meta.url).href;

type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  address: string;
  city: string;
  country: string;
  organization: string;
  position: string;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [signup, setSignup] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    city: "",
    country: "",
    organization: "",
    position: "",
  });
  const [errors, setErrors] = useState<string | null>(null);

  const handleNext = () => {
    setErrors(null);
    
    if (step === 1) {
      if (!signup.name.trim()) return setErrors('Please enter your full name');
      if (!signup.email.includes('@')) return setErrors('Please enter a valid email');
      if (signup.password.length < 6) return setErrors('Password must be at least 6 characters');
      if (signup.password !== signup.confirm) return setErrors('Passwords do not match');
    }
    
    if (step === 2) {
      if (!signup.address.trim()) return setErrors('Please enter your address');
      if (!signup.city.trim()) return setErrors('Please enter your city');
      if (!signup.country.trim()) return setErrors('Please enter your country');
    }
    
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    
    if (!signup.organization.trim()) return setErrors('Please enter your organization name');
    if (!signup.position.trim()) return setErrors('Please enter your position');
    
    console.log("User Data:", signup);
    navigate('/ocr');
  };

  const steps = [
    { 
      number: 1, 
      title: "Personal Info", 
      description: "Basic account details",
      icon: <User size={20} />
    },
    { 
      number: 2, 
      title: "Address Info", 
      description: "Location details",
      icon: <MapPin size={20} />
    },
    { 
      number: 3, 
      title: "Organization Info", 
      description: "Work information",
      icon: <Building size={20} />
    }
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily: "'Roboto Slab', serif"
      }}
    >
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Sidebar - Progress */}
          <div 
            className="lg:w-1/3 w-full lg:relative lg:block bg-white shadow-xl"
            style={{ 
              background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)"
            }}
          >
        <div className="p-8 h-full flex flex-col">
          {/* Logo Section */}
          <div className="flex items-center mb-12 text-white">
            <img src={logo} alt="EVS Logo" className="w-12 h-12 mr-3" />
            <div>
              <h1 
                className="text-2xl font-bold"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "700" }}
              >
                EVS Registration
              </h1>
              <p 
                className="text-white/80 text-sm"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Electronic Visitor System
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex-1">
            <h2 
              className="text-xl font-semibold text-white mb-8"
              style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "600" }}
            >
              Registration Progress
            </h2>
            
            <div className="space-y-6">
              {steps.map((stepItem, index) => (
                <div
                  key={index}
                  className={`flex items-center transition-all duration-300 ${
                    step === stepItem.number
                      ? "text-white"
                      : step > stepItem.number
                      ? "text-white"
                      : "text-white/60"
                  }`}
                >
                  {/* Step Circle */}
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
                      step > stepItem.number
                        ? "bg-white text-blue-600 border-white"
                        : step === stepItem.number
                        ? "bg-white/20 border-white text-white"
                        : "border-white/40 text-white/60"
                    }`}
                  >
                    {step > stepItem.number ? (
                      <Check size={20} />
                    ) : (
                      stepItem.icon
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 
                      className={`font-semibold transition-colors ${
                        step >= stepItem.number ? "text-white" : "text-white/60"
                      }`}
                      style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "600" }}
                    >
                      {stepItem.title}
                    </h3>
                    <p 
                      className={`text-sm transition-colors ${
                        step >= stepItem.number ? "text-white/80" : "text-white/40"
                      }`}
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="text-white/80 text-sm">
            <p style={{ fontFamily: "'Roboto Slab', serif" }}>
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-white font-semibold hover:underline"
                style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "600" }}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
            style={{ border: "1px solid #e2e8f0" }}
          >
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
                {steps[step - 1].title}
              </h2>
              <p 
                className="text-gray-600"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Step {step} of 3 - {steps[step - 1].description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(step / 3) * 100}%`,
                    background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)"
                  }}
                ></div>
              </div>
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

            {/* Form */}
            <form onSubmit={step === 3 ? handleSignUp : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
              
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
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
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          type="password"
                          required
                          value={signup.password}
                          onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ 
                            fontFamily: "'Roboto Slab', serif",
                            backgroundColor: "#f8fafc"
                          }}
                          placeholder="Min 6 characters"
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
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock 
                          size={20} 
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                        />
                        <input
                          type="password"
                          required
                          value={signup.confirm}
                          onChange={(e) => setSignup({ ...signup, confirm: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ 
                            fontFamily: "'Roboto Slab', serif",
                            backgroundColor: "#f8fafc"
                          }}
                          placeholder="Repeat password"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Address Info */}
              {step === 2 && (
                <>
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: "#0072a7",
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: "500"
                      }}
                    >
                      Street Address
                    </label>
                    <div className="relative">
                      <MapPin 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type="text"
                        required
                        value={signup.address}
                        onChange={(e) => setSignup({ ...signup, address: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Enter your street address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ 
                          color: "#0072a7",
                          fontFamily: "'Roboto Slab', serif",
                          fontWeight: "500"
                        }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={signup.city}
                        onChange={(e) => setSignup({ ...signup, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Enter your city"
                      />
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
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={signup.country}
                        onChange={(e) => setSignup({ ...signup, country: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Organization Info */}
              {step === 3 && (
                <>
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ 
                        color: "#0072a7",
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: "500"
                      }}
                    >
                      Organization Name
                    </label>
                    <div className="relative">
                      <Building 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type="text"
                        required
                        value={signup.organization}
                        onChange={(e) => setSignup({ ...signup, organization: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Enter your organization name"
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
                      Position / Role
                    </label>
                    <div className="relative">
                      <Briefcase 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                      <input
                        type="text"
                        required
                        value={signup.position}
                        onChange={(e) => setSignup({ ...signup, position: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ 
                          fontFamily: "'Roboto Slab', serif",
                          backgroundColor: "#f8fafc"
                        }}
                        placeholder="Enter your position or role"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div 
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    style={{ backgroundColor: "#f0f8ff", borderColor: "#b6e0fe" }}
                  >
                    <h4 
                      className="font-semibold mb-2"
                      style={{ 
                        color: "#0072a7",
                        fontFamily: "'Roboto Slab', serif",
                        fontWeight: "600"
                      }}
                    >
                      Registration Summary
                    </h4>
                    <div 
                      className="text-sm space-y-1"
                      style={{ 
                        color: "#005b8a",
                        fontFamily: "'Roboto Slab', serif"
                      }}
                    >
                      <p><strong>Name:</strong> {signup.name}</p>
                      <p><strong>Email:</strong> {signup.email}</p>
                      <p><strong>Location:</strong> {signup.city}, {signup.country}</p>
                      <p><strong>Organization:</strong> {signup.organization}</p>
                      <p><strong>Position:</strong> {signup.position}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    style={{ fontFamily: "'Roboto Slab', serif", fontWeight: "500" }}
                  >
                    <ChevronLeft size={20} className="mr-2" />
                    Back
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="submit"
                    className="flex items-center ml-auto px-6 py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    style={{ 
                      background: "linear-gradient(135deg, #0072a7 0%, #005b8a 100%)",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "600"
                    }}
                  >
                    Next
                    <ChevronRight size={20} className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center ml-auto px-8 py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    style={{ 
                      background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "600"
                    }}
                  >
                    <Check size={20} className="mr-2" />
                    Complete Registration
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}