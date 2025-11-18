import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import FolderPage from "./pages/FolderPage";

function App() {
  return (
    <Routes>
      <Route path="/" index={true} element={<Home />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route path="lab" element={<Dashboard />}>
          <Route path=":folderId" element={<FolderPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
