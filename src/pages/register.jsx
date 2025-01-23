import React from "react";
import RegisterForm from "../components/organism/RegisterForm";

function RegisterPage() {
  return (
    <div>
      <div className="flex items-center justify-center md:min-h-screen pt-6">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
