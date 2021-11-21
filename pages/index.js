import Link from 'next/link'
 import 'tailwindcss/tailwind.css'

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Navbar from '../components/Navbar'


export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container " >
      <Navbar />
      <div className="flex  flex-wrap  p-10 mt-14 gap-x-8 justify-between content-center">
        <div className="flex-initial">
        <h2 className=" text-4xl mb-5 text-gray-700">Quizlet Clone </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod, ipsum sed varius placerat, dui ligula maximus felis, non laoreet augue massa ac odio. Aliquam porta mi velit, quis venenatis orci semper nec. Nulla sodales ullamcorper elementum. Nulla quis ligula bibendum leo dapibus pretium. Donec justo dolor, pharetra posuere ultrices nec, blandit in velit. Praesent interdum urna tempus leo tempus suscipit. Praesent mollis iaculis pretium.</p>
        </div>
        <Link  href={{
        pathname: "/authPage",
      }}>
   
        <a  className="h-7 px-3 m-2 text-gray-100 transition-colors    bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800">
          Login/Sign Up
          </a>
   
        </Link>
      </div>

    </div>
  )
}