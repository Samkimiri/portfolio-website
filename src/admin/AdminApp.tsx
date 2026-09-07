import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { getSession, onAuthStateChange } from "../lib/auth";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });

    const subscription = onAuthStateChange(setSession);
    return () => subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 dark:bg-neutral-950">
        <div className="max-w-md rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 text-sm text-amber-800 dark:text-amber-300">
          <h1 className="mb-2 font-display text-lg font-semibold">Admin isn&apos;t configured</h1>
          <p>
            The admin panel needs Supabase. Set <code className="font-mono">VITE_SUPABASE_URL</code> and{" "}
            <code className="font-mono">VITE_SUPABASE_ANON_KEY</code>, run the migration in{" "}
            <code className="font-mono">supabase/schema.sql</code>, and create yourself a user in the Supabase
            dashboard under Authentication. See the README for details.
          </p>
          <Link to="/" className="mt-4 inline-block underline">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
        Loading…
      </div>
    );
  }

  return session ? <Dashboard /> : <Login />;
}
