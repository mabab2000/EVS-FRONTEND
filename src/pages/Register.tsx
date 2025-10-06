import React from "react";


export type SignUpData = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

interface RegisterFormProps {
  signup: SignUpData;
  setSignup: (data: SignUpData) => void;
  handleSignUp: (e: React.FormEvent) => void;
}

export default function RegisterForm({
  signup,
  setSignup,
  handleSignUp,
}: RegisterFormProps) {
  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Full name
        </label>
        <input
          type="text"
          required
          value={signup.name}
          onChange={(e) => setSignup({ ...signup, name: e.target.value })}
          className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          type="email"
          required
          value={signup.email}
          onChange={(e) => setSignup({ ...signup, email: e.target.value })}
          className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Password
          </label>
          <input
            type="password"
            required
            value={signup.password}
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Confirm
          </label>
          <input
            type="password"
            required
            value={signup.confirm}
            onChange={(e) => setSignup({ ...signup, confirm: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="Repeat password"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium shadow-md"
      >
        Create account
      </button>
    </form>
  );
}
