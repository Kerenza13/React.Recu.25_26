import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(loginUsername, loginPassword);
    if (success) navigate("/dashboard");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await register(regUsername, regPassword, regName);
    if (success) setIsRegistering(false);
  };

  return (
<div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
  <div className="flex justify-center mb-8">
    <button
      onClick={() => setIsRegistering(false)}
      className={`px-6 py-2 text-sm font-medium border-b-2 transition ${
        !isRegistering
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      Iniciar Sesión
    </button>
    <button
      onClick={() => setIsRegistering(true)}
      className={`px-6 py-2 text-sm font-medium border-b-2 transition ${
        isRegistering
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      Registrarse
    </button>
  </div>

  {!isRegistering ? (
    <form onSubmit={handleLogin} className="space-y-5">
      <input
        type="text"
        placeholder="Usuario"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
      >
        Entrar
      </button>
    </form>
  ) : (
    <form onSubmit={handleRegister} className="space-y-5">
      <input
        type="text"
        placeholder="Nombre completo"
        value={regName}
        onChange={(e) => setRegName(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
      <input
        type="text"
        placeholder="Usuario"
        value={regUsername}
        onChange={(e) => setRegUsername(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={regPassword}
        onChange={(e) => setRegPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
      >
        Registrarse
      </button>
    </form>
  )}
</div>
  );
}
