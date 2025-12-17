import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/api";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const {
    mutate: createAccount,

    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-10">
        <h1 className="font-bold text-center text-2xl">
          Make room for coordination!
        </h1>
        <p className="text-center">Enter your details to create an account.</p>
        {isError && (
          <p className="text-error text-center m-2">
            {error?.message || "An error occured"}
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
          disabled={isPending}
        />
        <p>Must be at least 6 characters in length.</p>
        {/* need to style ^ */}
        <label className="label">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className="input"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            createAccount({ email, password, confirmPassword })
          }
          disabled={isPending}
        />

        <button
          className="btn btn-soft btn-primary mb-2"
          disabled={
            !email ||
            password.length < 6 ||
            password != confirmPassword ||
            isPending
          }
          onClick={() => {
            createAccount({ email, password, confirmPassword });
          }}
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
        <p className="mt-2 ml-2 flex justify-center items-center text-xs">
          <Link to={"/login"} className="link link-hover font-bold p-2">
            Already have an account?
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Register;
