import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendPasswordResetEmail } from "../lib/api";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-10">
        <h1 className="font-bold text-center text-2xl">Reset your password</h1>
        {isError && (
          <p className="text-error text-center m-2">
            {error?.message || "An error occured"}
          </p>
        )}
        ;<label className="label">Email</label>
        {isSuccess ? (
          <div
            role="alert"
            className={isSuccess ? "alert alert-success" : "alert alert-error"}
          >
            {isSuccess
              ? "Email sent! Check your inbox for further instructions"
              : "Something went wrong."}
          </div>
        ) : (
          <>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="Email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />
            <button
              className="btn btn-soft btn-primary mb-2"
              disabled={!email}
              onClick={() => {
                sendPasswordReset(email);
              }}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending Email...
                </>
              ) : (
                "Reset password"
              )}
            </button>
          </>
        )}
        <p className="text-[10px] text-center">
          Go back to{" "}
          <p className="mt-2 ml-2 flex justify-center items-center text-xs">
            <Link to={"/login"} className="link link-hover font-bold p-2">
              Sign in
            </Link>
          </p>
          &nbsp;or&nbsp;
          <p className="mt-2 ml-2 flex justify-center items-center text-xs">
            <Link to={"/register"} className="link link-hover font-bold p-2">
              Sign up
            </Link>
          </p>
        </p>
      </fieldset>
    </div>
  );
};

export default ForgotPassword;
