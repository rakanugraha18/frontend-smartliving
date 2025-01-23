import React from "react";
import LoginForm from "../components/organism/LoginForm";
import logo from "../assets/LogoSmartLiving.svg";

function LoginPage() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen pt-6">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
