import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between px-4">
        <h1 className="font-bold text-xl">
          <Link to="/">Mi Blog</Link>
        </h1>
        <nav className="space-x-4">
          <Link to="/">Inicio</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="text-red-400">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
