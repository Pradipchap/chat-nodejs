import GoogleLogo from "../assets/google.svg";
import Input from "../components/Inputs/Input";
import Button from "../components/Button";
import { FormEvent, useState } from "react";
import { SERVER_BASE_URL } from "../../utils/constants";
import useToast from "../../customHooks/useToast";
import { useNavigate } from "react-router-dom";
import EmailVerification from "./EmailVerification";

export default function Signup() {
  const { showError, showLoading, showSuccess } = useToast();
  const [step, setState] = useState(1);
  const navigate = useNavigate();

  async function signUpHandler(event: FormEvent) {
    event.preventDefault();
    console.log("first");
    showLoading("loading");
    const requestData = {
      fullName: "Chris",
      email: "Chris@gmail.com",
      password: "Chris",
    };

    try {
      const response = await fetch("http://localhost:3000" + "/api/register", {
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
    <div className="w-full min-h-screen h-full flex flex-none justify-center items-center p-5">
      {step === 0 ? (
        <div className="max-w-[400px] 2xl:max-w-[800px] w-full border-gray-100 border p-5 shadow-lg !bg-transparent flex flex-col gap-2 2xl:gap-7">
          <p className="text-customBlue mb-1 text-3xl font-semibold">
            Register your account!
          </p>
          <p className="text-customInputText text-base font-normal">
            Register to start using .
          </p>
          <form
            className="space-y-4 2xl:space-y-7 mt-6 flex flex-col"
            onSubmit={signUpHandler}
          >
            <Input
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <Input
              type="email"
              name="username"
              label="Email"
              placeholder="Enter your email or phone number"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Enter your password"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <Button type="submit" className="w-full text-lg">
              Sign Up
            </Button>
            <button
              // onClick={() => signIn("google")}
              className="w-full h-10 font-medium shadow-md hover:text-black border hover:border-customBlue rounded-[4px]"
            >
              <div className="flex items-center justify-center">
                <img
                  src={GoogleLogo}
                  alt="google-logo"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Google
              </div>
            </button>
          </form>
        </div>
      ) : (
        <EmailVerification />
      )}
    </div>
  );
}
