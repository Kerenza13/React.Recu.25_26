import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const API_URL = import.meta.env.VITE_API_URL;

  const login = async (username, password) => {
    const res = await fetch(
      `${API_URL}/users?username=${username}&password=${password}`
    );
    const data = await res.json();

    if (data.length > 0) {
      const foundUser = data[0]; 

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(foundUser));

      setUser(foundUser);
      setIsLoggedIn(true);

      return true;
    } else {
      alert("Credenciales inválidas");
      return false;
    }
  };

  const register = async (username, password, name) => {
    const checkRes = await fetch(`${API_URL}/users?username=${username}`);
    const existing = await checkRes.json();

    if (existing.length > 0) {
      alert("El nombre de usuario ya está en uso.");
      return false;
    }

    const newUser = {
      username,
      password,
      name,
      role: "user",
    };

    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
      return true;
    } else {
      alert("Error al registrar el usuario.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
