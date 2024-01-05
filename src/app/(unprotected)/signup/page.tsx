"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "../../../components/formComponents/FormInput";
import FormLabel from "../../../components/formComponents/FormLabel";
import FormModal from "../../../components/formComponents/FormModal";
import Backend from "../../../components/Backend";
import "./signup.css";

const SignUp = () => {
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupLink = (
    <a className="login-link" href="/login">
      Login
    </a>
  );
  const bottomText = <span>Already have an account? {signupLink} now!</span>;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setSignupError("");
    setLoading(true);

    const { email, password } = event.currentTarget;

    const signupResponse = await Backend.signup(email.value, password.value);
    setLoading(false);

    if (signupResponse.errors) {
      setSignupError(signupResponse.errors[0]);
      return;
    }

    setLoading(false);
    router.push("/home");
    router.refresh();
  };

  return (
    <>
      <FormModal
        formTitle="Sign Up"
        submitText="Sign Up"
        bottomText={bottomText}
        onSubmit={handleSubmit}
        errorText={signupError}
        loading={loading}
      >
        <FormLabel htmlFor="email">Email: </FormLabel>
        <FormInput type="email" required />
        <FormLabel htmlFor="password">Password: </FormLabel>
        <FormInput type="password" required />
      </FormModal>
    </>
  );
};

export default SignUp;
