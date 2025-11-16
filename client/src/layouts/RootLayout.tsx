import { Outlet, useNavigate } from "react-router";
import { useAuthSession } from "../hooks";

export default function RootLayout() {
  const { session, loading } = useAuthSession();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (!session) {
    navigate("/auth/login");
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
