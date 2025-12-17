import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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
        {/* {isPending ? <>
              <span className="loading loading-spinner loading-sm"></span>
              Signing in...
            </> } */}
      </fieldset>
    </div>
  );
};

export default VerifyEmail;
