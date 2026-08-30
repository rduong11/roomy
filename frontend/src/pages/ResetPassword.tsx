import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../lib/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>(
    searchParams.get("code") || "",
  );
  const navigate = useNavigate();

  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      return;
    }
    resetUserPassword({ password, verificationCode });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-10">
        <h1 className="font-bold text-center text-2xl">Reset your password</h1>
        <p className="text-center">Enter your new password below.</p>
        {isError && (
          <p className="text-error text-center m-2">
            {error?.message || "An error occurred"}
          </p>
        )}
        {isSuccess && (
          <div role="alert" className="alert alert-success">
            Password reset successful! Redirecting to login...
          </div>
        )}
        {!isSuccess && (
          <>
            <label className="label">Verification Code</label>
            <input
              id="verificationCode"
              type="text"
              className="input"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isPending}
            />

            <label className="label">New Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />

            <label className="label">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={isPending}
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-error text-sm">Passwords do not match</p>
            )}

            <button
              className="btn btn-soft btn-primary mb-2"
              disabled={
                !password ||
                !confirmPassword ||
                !verificationCode ||
                password !== confirmPassword ||
                isPending
              }
              onClick={handleSubmit}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Resetting password...
                </>
              ) : (
                "Reset password"
              )}
            </button>
          </>
        )}
        <p className="mt-2 ml-2 flex justify-center items-center text-xs">
          <Link to={"/login"} className="link link-hover font-bold p-2">
            Back to sign in
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default ResetPassword;
