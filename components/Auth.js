import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Router from 'next/router'
export default function Auth() {
  
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
     Router.back()
    }
  }

  return (
    <div className="row flex flex-center flex-col">

        <p className="p-5">Sign in via magic link with your email below</p>
        <div className="p-6">
          <input
            className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="px-6">
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="h-9 px-5 m-2 text-gray-100 transition-colors    bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
 
  )
}
