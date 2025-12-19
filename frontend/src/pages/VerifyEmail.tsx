import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";

const VerifyEmail = () => {
  const { code } = useParams<{ code: string }>();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code!),
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-10">
        {isPending ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Sending email...
          </>
        ) : (
          <>
            {/* <h2 className="font-bold text-center text-2xl">
              Please verify your email
            </h2>
            <p className="text-center">We just sent an email to {`EMAIL`}.</p>
            <p className="text-center">
              Click the link in the email to verify your account.
            </p> */}
            <div
              role="alert"
              className={
                isSuccess ? "alert alert-success" : "alert alert-error"
              }
            >
              {isSuccess ? "Email verified!" : "Invalid link."}
            </div>
            {isError && (
              <>
                <p className="text-[10px] text-center">
                  The link is either invalid or expired.
                </p>
                <p className="mt-2 ml-2 flex justify-center items-center text-xs">
                  <Link
                    to={"/password/reset"}
                    className="link link-hover font-bold p-2"
                  >
                    Get a new link
                  </Link>
                </p>
              </>
            )}
            <p className="mt-2 ml-2 flex justify-center items-center text-xs">
              <Link to={"/"} className="link link-hover font-bold p-2">
                Back to home
              </Link>
            </p>
          </>
        )}
      </fieldset>
    </div>
  );
};

export default VerifyEmail;
