import { Outlet, useNavigate } from "react-router";
import { useAuthSession } from "../lib/hooks";

export default function AuthLayout() {
  const { session, loading } = useAuthSession();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (session) {
    navigate("/lab");
  }
  return (
    <main>
      <Outlet />
    </main>
  );
}
