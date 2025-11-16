import { Outlet, useNavigate } from "react-router";
import { useAuthSession } from "../hooks";

export default function AuthLayout() {
  const { session, loading } = useAuthSession();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (session) {
    navigate("/dashboard");
  }
  return (
    <main>
      <Outlet />
    </main>
  );
}
