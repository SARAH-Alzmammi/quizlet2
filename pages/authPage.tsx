import Auth from "../components/Auth";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Router from "next/router";
import { Session } from "@supabase/gotrue-js/src/lib/types";
export default function AuthPage() {
  const [UserSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    setUserSession(supabase.auth.session());
  }, []);

  return (
    <div>
      <></>

      {!UserSession ? <Auth /> : Router.back()}
    </div>
  );
}
