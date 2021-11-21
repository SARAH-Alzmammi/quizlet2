
 import 'tailwindcss/tailwind.css'

 import { useState, useEffect } from 'react'
 import { supabase } from '../utils/supabaseClient'
 import Auth from '../components/Auth'
 import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
 
 export default function dashboardPage() {
   const [session, setSession] = useState(null)
 
   useEffect(() => {
     setSession(supabase.auth.session())
     supabase.auth.onAuthStateChange((_event, session) => {
       setSession(session)
     })
   }, [])
 
   return (
     <div className="container" >
       <Navbar/>
       {!session ? <Auth /> :
         <Dashboard key={session.user.id} session={session} />
         }
     </div>
   )
 }