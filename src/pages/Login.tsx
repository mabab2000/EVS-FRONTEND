import React from "react";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignIn: (e: React.FormEvent) => void;
}

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  handleSignIn,
}: LoginFormProps) {
  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 text-indigo-600" />
          <span className="text-gray-600 dark:text-gray-300">Remember me</span>
        </label>
        <a
          href="#"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium shadow-md"
      >
        Sign in
      </button><a href="#/Dashboard">Continue</a>
    </form>
  );
}
