import Link from "next/link";
import "tailwindcss/tailwind.css";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Navbar from "../components/Navbar";
import { Session } from "@supabase/gotrue-js/src/lib/types";

export default function Home() {
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="w-50">
      <Navbar />
      <div className="flex flex-col flex-wrap  p-10 mt-14  justify-between content-center">
        <div className="flex-initial ">
          <h2 className=" text-4xl mb-5 text-gray-700">
            Learn it. Own it. Quizlet.
          </h2>
          <p>
            With new expert explanations, an AI Learning Assistant and our
            ever-effective flashcards, get a suite of science-backed study tools
            at your fingertips.
          </p>
        </div>
        {!session ? (
          <Link
            href={{
              pathname: "/authPage"
            }}>
            <a className="h-7 px-3 m-2 text-white transition-colors    bg-cyan rounded-lg focus:shadow-outline hover:bg-gray-800">
              Login/Sign Up
            </a>
          </Link>
        ) : (
          <Link
            href={{
              pathname: "/dashboardPage"
            }}>
            <a className="h-7 px-3 m-2 text-white transition-colors    bg-yellow rounded-lg focus:shadow-outline hover:bg-cyan">
              Dashboard
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
