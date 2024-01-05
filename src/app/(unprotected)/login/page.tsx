"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "../../../components/formComponents/FormInput";
import FormLabel from "../../../components/formComponents/FormLabel";
import FormModal from "../../../components/formComponents/FormModal";
import Backend from "../../../components/Backend";
import "./login.css";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupLink = (
    <a className="signup-link" href="/signup">
      Sign up
    </a>
  );
  const bottomText = <span>Not a user? {signupLink} now!</span>;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoginError("");
    setLoading(true);

    const { email, password } = event.currentTarget;

    const loginResponse = await Backend.login(email.value, password.value);
    setLoading(false);

    if (loginResponse.errors) {
      setLoginError(loginResponse.errors[0]);
      return;
    }

    router.push("/home");
    router.refresh();
  };

  return (
    <>
      <FormModal
        formTitle="Login"
        submitText="Login"
        bottomText={bottomText}
        onSubmit={handleSubmit}
        errorText={loginError}
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

export default Login;
