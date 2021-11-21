import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'

export default function Navbar() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">

      <div className="flex items-center flex-shrink-0 text-green mr-6">
        
    <Link  href={{
        pathname: "/",}}>
   <a className="font-semibold text-xl tracking-tight">Quizlet C</a>
        </Link>
    </div>
           
          {!session ?   <Link  href={{
        pathname: "/authPage",
      }}>
   
        <a  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green mr-4 ">
          Login/Sign Up
          </a>
   
        </Link> :
          <Link href={{
          pathname: "/dashboardPage",}}>
        
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green mr-4">
            Dashboard
            </a>
        
        </Link>
         }    
  </nav>
)
}

