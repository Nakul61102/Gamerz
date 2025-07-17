import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { loginUser } from "../api"; // Adjust the import path as necessary

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMsg("");
  setSuccessMsg("");

  try {
    const data = await loginUser({ email, password });

    setSuccessMsg("Login successful!");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user || {}));

    setUser(data.user || null);
    console.log("Login successful:", data.user);
    navigate("/feed");
  } catch (error) {
    console.error("Login error:", error);
    setErrorMsg(
      "Login failed: " +
        (error.response?.data?.message || "An error occurred.")
    );
  }
};


  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120] text-white">
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-[#111827] bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {errorMsg && (
            <p className="bg-red-500 text-white px-4 py-2 mb-4 rounded">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
              {successMsg}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
