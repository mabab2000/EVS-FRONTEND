import { useState } from 'react'
import evsImage from "../assets/logo.png";
type SignUpData = {
  name: string
  email: string
  password: string
  confirm: string
}

export default function Login() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  // Sign in
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Sign up
  const [signup, setSignup] = useState<SignUpData>({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<string | null>(null)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // replace with real auth
    console.log('signin', { email, password })
    alert('Signed in (demo)')
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(null)
    if (!signup.name.trim()) return setErrors('Please enter your name')
    if (!signup.email.includes('@')) return setErrors('Please enter a valid email')
    if (signup.password.length < 6) return setErrors('Password must be at least 6 characters')
    if (signup.password !== signup.confirm) return setErrors('Passwords do not match')
    // replace with real sign up flow
    console.log('signup', signup)
    alert('Signed up (demo)')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mx-4">
       <div className="mb-6 text-center">
  {/* Centered Circular Image */}
  <img
    src={evsImage}
    alt="Profile"
    className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
  />

  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
    {mode === 'signin' ? 'Welcome back' : 'Create account'}
  </h2>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    {mode === 'signin' ? 'Sign in to your account' : 'Start your free account'}
  </p>
</div>


        {errors && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400">{errors}</div>
        )}

        {/* Animated form stack: both forms are present and cross-fade/slide when mode changes */}
        <div className="relative min-h-[320px]">
          <div
            aria-hidden={mode !== 'signin'}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${mode === 'signin' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 pointer-events-none'}`}
          >
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600" />
                  <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</a>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium shadow-md focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div
            aria-hidden={mode !== 'signup'}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${mode === 'signup' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'}`}
          >
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full name</label>
                <input
                  type="text"
                  required
                  value={signup.name}
                  onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  required
                  value={signup.email}
                  onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                  <input
                    type="password"
                    required
                    value={signup.password}
                    onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm</label>
                  <input
                    type="password"
                    required
                    value={signup.confirm}
                    onChange={(e) => setSignup({ ...signup, confirm: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Repeat password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium shadow-md focus:outline-none"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {mode === 'signin' ? (
            <>Don’t have an account? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signup') }} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign up</a></>
          ) : (
            <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signin') }} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Sign in</a></>
          )}
        </p>
      </div>
    </div>
  )
}
