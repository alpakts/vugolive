"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/web-components/button/button";
import Image from "next/image";
import { auth } from "../../../../firebaseConfig";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir email adresi girin")
    .required("Email alanı zorunludur"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre alanı zorunludur"),
});

const LoginForm = ({setPage}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (values) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/account");
    } catch (err) {
      setError("Kullanıcı adı veya şifre yanlış!");
    }
  };

  return (
    <div className="text-white pt-20 px-4 flex flex-col gap-6 min-h-screen">
       <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
          <Image src="/logo.png" alt="Vugo Logo" className="mx-auto " width={50} height={50}/>
          <h2 className="mt-6 text-center text-xl font-normal text-white">
            E-Posta ile Giriş Yap
          </h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values)=>handleLogin(values)}
        >
          {() => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-5">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Şifre
                  </label>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Şifre"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {
                error && <div className="text-red-500 text-sm">{error}</div>
              }
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="show-password"
                    name="show-password"
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                    className="h-4 w-4 text-secondary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="show-password"
                    className="ml-2 block text-sm text-gray-400"
                  >
                    Şifreyi göster
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-secondary hover:text-primary "
                  >
                    Şifrenizi mi unuttunuz?
                  </a>
                </div>
              </div>

              <div>
                <CustomButton
                  type="submit"
                  className="bg-gray-900 hover:bg-primary  text-white w-full py-2 rounded-md"
                >
                  Devam et
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-center text-gray-400">
          Bir hesabınız yok mu?{' '}
          <a href="#" 
          onClick={()=>{
            setPage('register');
          }}
          className="text-secondary hover:text-primary">
            Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
