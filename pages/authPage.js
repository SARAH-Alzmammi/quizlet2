
import Auth from '../components/Auth'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Router from 'next/router'


 export default function AuthPage() {
   const [session, setSession] = useState(null)
 
   useEffect(() => {
     setSession(supabase.auth.session())
 
     supabase.auth.onAuthStateChange((_event, session) => {
       setSession(session)
     })
   }, [])


 
   return (
     <div className="container">
       <Navbar />
       {!session ?  <Auth /> :  Router.back('dashboardPage')}
     </div>
   )
 }