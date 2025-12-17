import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-10">
        <h1 className="font-bold text-center text-2xl">
          Welcome back, productivity champion!
        </h1>
        <p className="text-center">Enter your account details to sign in.</p>
        {isError && (
          <p className="text-error text-center m-2">
            Invalid password or email
          </p>
        )}
        <label className="label">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />

        <label className="label">Password</label>
        <input
          id="password"
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && signIn({ email, password })}
          disabled={isPending}
        />
        <Link
          to={"/password/forgot"}
          className="link link-hover font-medium p-2"
        >
          Forgot Password?
        </Link>

        <button
          className="btn btn-soft btn-primary mb-2"
          disabled={!email || password.length < 6 || isPending}
          onClick={() => {
            signIn({ email, password });
          }}
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
        <p className="mt-2 ml-2 flex justify-between items-center text-xs">
          <span>Don't have an account?</span>
          <Link to={"/register"} className="btn btn-soft btn-info w-32 p-4 ">
            Get Started
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
