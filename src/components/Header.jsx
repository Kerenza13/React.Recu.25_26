import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header>
      <div>
        <h1>
          <Link to="/">Mi Blog</Link>
        </h1>
        <nav>
          <Link to="/">Inicio</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
              >
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
