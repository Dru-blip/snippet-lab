import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import type { Session } from "better-auth";

export function useAuthSession() {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchSession() {
      const { data } = await authClient.getSession();
      if (isMounted) {
        setSession(data?.session ?? undefined);
        setLoading(false);
      }
    }

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return { session, loading };
}
