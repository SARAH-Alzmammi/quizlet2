import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/gotrue-js/src/lib/types";

export default function Navbar() {
  const [UserSession, SetUserSession] = useState<Session | null>(null);

  useEffect(() => {
    SetUserSession(supabase.auth.session());
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-primary p-4  text-gray-100">
      <div className="flex items-center flex-shrink-0  mr-6">
        <Link href={{ pathname: "/" }}>
          <a className="font-semibold text-xl tracking-tight">Quizlet C</a>
        </Link>
      </div>

      {!UserSession ? (
        <Link href={{ pathname: "/AuthPage" }}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-green mr-4 h-7 px-5 m-2  bg-yellow rounded-lg focus:shadow-outline">
            Login/Sign Up
          </a>
        </Link>
      ) : (
        <Link href={{ pathname: "/DashboardPage" }}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green mr-4 border-b-2 border-yellow">
            Dashboard
          </a>
        </Link>
      )}
    </nav>
  );
}
