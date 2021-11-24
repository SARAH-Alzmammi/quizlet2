import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";

import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { Session } from "@supabase/gotrue-js/src/lib/types";

export default function DashboardPage() {
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Navbar />
      {!session ? <Auth /> : <Dashboard key={session.user.id} />}
    </div>
  );
}
