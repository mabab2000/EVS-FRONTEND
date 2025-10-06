import { useState } from "react";
import evsImage from "../assets/logo.png";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import type { SignUpData } from "../types";

export default function Home() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("signin", { email, password });
    alert("Signed in (demo)");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    if (!signup.name.trim()) return setErrors("Please enter your name");
    if (!signup.email.includes("@")) return setErrors("Please enter a valid email");
    if (signup.password.length < 6)
      return setErrors("Password must be at least 6 characters");
    if (signup.password !== signup.confirm)
      return setErrors("Passwords do not match");
    console.log("signup", signup);
    alert("Signed up (demo)");
  };

  return (
    <div className="min-h-screen md:w-full flex items-center justify-center  p-6">
      <div className="bg-white border border-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left side - Hidden on mobile, visible on md screens and up */}
        <div className="hidden md:flex flex-col items-center justify-center md:w-1/2 p-8 bg-gray-50 dark:bg-gray-700">
          <img
            src={evsImage}
            alt="EVS Logo"
            className="w-52 h-52 object-contain mb-6 rounded-full shadow-md"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Welcome to EVS Platform
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              EVS designed to streamline and secure visitor registration, tracking, and management. It simplifies visitor check-ins, improves security, and provides real-time insights into visitor activities for efficient facility access control.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            {mode === "signin"
              ? "Sign in to your account"
              : "Start your free account"}
          </p>

          {errors && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400 text-center">
              {errors}
            </div>
          )}

          <div className="relative min-h-[320px]">
            <div
              aria-hidden={mode !== "signin"}
              className={`absolute inset-0 transition-all duration-500 ${
                mode === "signin"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-6 pointer-events-none"
              }`}
            >
              <LoginForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSignIn={handleSignIn}
              />
            </div>

            <div
              aria-hidden={mode !== "signup"}
              className={`absolute inset-0 transition-all duration-500 ${
                mode === "signup"
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-6 pointer-events-none"
              }`}
            >
              <RegisterForm
                signup={signup}
                setSignup={setSignup}
                handleSignUp={handleSignUp}
              />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("signup");
                  }}
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
              <br/>     <br/>  <br/>             Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("signin");
                  }}
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  Sign in
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}