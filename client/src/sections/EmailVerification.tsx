import OTP from "../components/Otp";
import Button from "../components/Button";
import { FormEvent } from "react";
import useToast from "../../customHooks/useToast";
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
	const { showError, showLoading, showSuccess } = useToast();
  const navigate = useNavigate();

  async function EmailVerificationHandler(event: FormEvent) {
    event.preventDefault();
    console.log("first");
    showLoading("loading");
    const requestData = {
      email: "Chris@gmail.com",
      code: "Chris",
    };

    try {
      const response = await fetch("http://localhost:3000" + "/api/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (await response.ok) {
        showSuccess("User successfully created");
        navigate("/login");
      } else {
        showError("user cannot be registered");
      }
    } catch (error) {
      showError("user cannot be registered");
    }
  }
  return (
    <form className="flex flex-col gap-4 p-5" onSubmit={EmailVerificationHandler}>
      <OTP
        title="Email verification"
        handleResend={() => {}}
        onchange={() => {}}
        subtitle="Enter verification code sent to your mail"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
