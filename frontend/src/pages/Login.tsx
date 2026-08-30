import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../config/authContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async () => {
    if (!email || password.length < 6) return;

    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-10">
        <h1 className="font-bold text-center text-2xl">
          Welcome back, productivity champion!
        </h1>
        <p className="text-center">Enter your account details to sign in.</p>
        {error && <p className="text-error text-center m-2">{error}</p>}
        <label className="label">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <label className="label">Password</label>
        <input
          id="password"
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={isLoading}
        />
        <Link
          to={"/password/forgot"}
          className="link link-hover font-medium p-2"
        >
          Forgot Password?
        </Link>

        <button
          className="btn btn-soft btn-primary mb-2"
          disabled={!email || password.length < 6 || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
        <p className="mt-2 ml-2 flex justify-center items-center text-xs">
          <Link to={"/register"} className="link link-hover font-bold p-2">
            Don't have an account?
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
