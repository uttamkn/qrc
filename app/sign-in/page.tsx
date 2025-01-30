import LoginGithub from "@/components/LoginGithub";
import React from "react";

const SignIn = () => {
  return (
    <div className="mt-20 flex w-full justify-center">
      <section className="flex w-[400px] flex-col">
        <h1 className="mb-6 w-full text-center text-3xl font-bold">Sign in</h1>
        <LoginGithub />
      </section>
    </div>
  );
};

export default SignIn;
