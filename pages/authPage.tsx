import Auth from "../components/Auth";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Router from "next/router";
import { Session } from "@supabase/gotrue-js/src/lib/types";
export default function AuthPage() {
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <></>

      {!session ? <Auth /> : Router.back()}
    </div>
  );
}
