import { useState, useEffect } from "react";

import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/gotrue-js/src/lib/types";

export default function DashboardPage() {
  const [UserSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    setUserSession(supabase.auth.session());
  }, []);
  return (
    <div>
      <Navbar />
      {!UserSession ? <Auth /> : <Dashboard key={UserSession.user.id} />}
    </div>
  );
}
