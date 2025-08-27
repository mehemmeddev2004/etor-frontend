"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { loginSuccess, registerSuccess } from "@/store/slices/auth/auth.slice"
import { loginApi } from "@/store/utils/auth-login"
import { registerApi } from "@/store/utils/auth-register"

interface LoginProps {
  isOpen: boolean
  onClose: () => void
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (isRegister) {
        if (!email || !password || !firstname || !lastname) {
          setError("Tüm alanlar dolu olmalı")
          setLoading(false)
          return
        }
        try {
          const response = await registerApi(email, password, firstname, lastname)
          dispatch(
            registerSuccess({
              user: {
                email: response.user.email,
                firstname: response.user.firstname,
                lastname: response.user.lastname,
              },
              token: response.token,
            }),
          )
          console.log("Login Succesfully")
          console.log(response.data)
        } catch (err: any) {
          console.log(err)
          return
        }
      } else {
        if (!email || !password) {
          console.log("need email and password")
          return
        }
        const response = await loginApi(email, password)
        if (!response || !response.user || !response.token) {
          setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.")
          setLoading(false)
          return
        }
        dispatch(
          loginSuccess({
            user: { email: response.user.email, firstname: response.user.firstname, lastname: response.user.lastname },
            token: response.token,
          }),
        )
        console.log("Login succesfully")
      }
      onClose()
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex max-[991px]:hidden items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
          aria-label="Kapat"
          type="button"
        >
          <Image src="/img/fa-x.svg" width={16} height={16} alt="Kapat" className="opacity-60" />
        </button>

        <div className="px-8 pt-8 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{isRegister ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {isRegister ? "Join ETOR and discover amazing products" : "Sign in to your account to continue"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {isRegister && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="First name"
                    required={isRegister}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Last name"
                    required={isRegister}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRegister ? "Create Password *" : "Password *"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            {isRegister ? (
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                />
                <span>I'd like to receive email updates</span>
              </label>
            ) : (
              <div className="flex-1"></div>
            )}
            {!isRegister && (
              <button
                type="button"
                className="text-black hover:text-gray-700 font-medium transition-colors duration-200"
              >
                Forgot password?
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Please wait...</span>
              </div>
            ) : (
              <span>{isRegister ? "Create Account" : "Sign In"}</span>
            )}
          </button>
        </form>

        <div className="px-8 pb-8 text-center border-t border-gray-100 pt-6">
          {isRegister ? (
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-black font-semibold hover:text-gray-700 transition-colors duration-200"
                onClick={() => setIsRegister(false)}
              >
                Sign in
              </button>
            </p>
          ) : (
            <p className="text-gray-600 text-sm">
              New to ETOR?{" "}
              <button
                type="button"
                className="text-black font-semibold hover:text-gray-700 transition-colors duration-200"
                onClick={() => setIsRegister(true)}
              >
                Create an account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
