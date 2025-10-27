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
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsRegistering(false)}
          className={`px-4 py-2 border-b-2 ${
            !isRegistering
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setIsRegistering(true)}
          className={`px-4 py-2 border-b-2 ${
            isRegistering
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Registrarse
        </button>
      </div>

      {!isRegistering ? (
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Usuario"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Contraseña"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Entrar
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Nombre completo"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Usuario"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Contraseña"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <button className="w-full bg-green-600 text-white py-2 rounded">
            Registrarse
          </button>
        </form>
      )}
    </div>
  );
}
