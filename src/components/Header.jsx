import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <Link to="/" className="hover:text-gray-300 transition">
            Mi Blog
          </Link>
        </h1>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-gray-300 transition"
          >
            Inicio
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}