import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Router from "next/router";
import "tailwindcss/tailwind.css";

export default function Auth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      Router.back();
    }
  };

  return (
    <div className="flex flex-col  p-6 align-items-center mt-20 w-25%">
      <a
        className=" text-s bg-transparent hover:text-blue-700 text-gray-400  border-b-blue-500 mb-10 pb-3 cursor-pointer"
        onClick={Router.back}>
        Back
      </a>
      <p className="py-5 text-left text-gray-400">
        Sign in via magic link with your email below
      </p>

      <input
        className="border-2 border-gray-200   py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-yellow"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
        className="h-9 px-5 my-4   text-white bg-cyan
             focus:shadow-outline "
        disabled={loading || !email}>
        <span>{loading ? "Loading" : "Send magic link"}</span>
      </button>
    </div>
  );
}
