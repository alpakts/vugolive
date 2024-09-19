'use client';
import { useState } from "react";
import RegisterForm from "./forms/register-form";
import LoginForm from "./forms/login-form";


const EmailAuth = () => {
    const [isRegister, setIsRegister] = useState('login');
  return (
    <div className="text-white  px-4 flex flex-col gap-6 min-h-screen">
         {isRegister =='register' ? (
          <RegisterForm setPage={setIsRegister} />
        ) : (
          <LoginForm setPage={setIsRegister} />
        )}
    </div>
  );
};

export default EmailAuth;
