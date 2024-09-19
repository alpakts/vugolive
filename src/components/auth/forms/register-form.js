"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/web-components/button/button";
import Image from "next/image";
import { auth } from "../../../../firebaseConfig";

// Form doğrulama şeması: Full Name ve Şifreyi Tekrar Yaz alanları eklendi
const validationSchema = Yup.object({
  fullName: Yup.string().required("Ad Soyad alanı zorunludur").test(
    "is-fullname",
    "Ad Soyad en az iki kelime olmalıdır",
    (value) => value && value.trim().split(" ").length >= 2
  ),
  email: Yup.string()
    .email("Geçerli bir email adresi girin")
    .required("Email alanı zorunludur"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre alanı zorunludur"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifreyi tekrar girin"),
});

const RegisterForm = ({setPage}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (values) => {
    setError(null);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: values.fullName, 
        });
      router.push("/account");
    } catch (err) {
    debugger;
      if (err.code === "auth/email-already-in-use") {
        setError("Bu email adresi zaten kullanımda!");
      }else if(err.code === "auth/weak-password"){
        setError("Şifre en az 6 karakter olmalıdır");
      }else{
        setError("Bir Hata Oluştu!");
      }
    }
  };

  return (
    <div className="text-white pt-20 px-4 flex flex-col gap-6 min-h-screen">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
        <Image src="/logo.png" alt="Vugo Logo" className="mx-auto " width={50} height={50}/>
          <h2 className="mt-6 text-center text-xl font-normal text-white">
            Kayıt Ol
          </h2>
          <div className="text-sm font-light">
            Görünüşe göre bir hesabınız yok. Haydi yeni bir hesap oluşturalım.
          </div>
        </div>
        <Formik
          initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values)=>handleRegister(values)}
        >
          {() => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-5">
                {/* Full Name Alanı */}
                <div>
                  <label htmlFor="fullName" className="sr-only">
                    Full Name
                  </label>
                  <Field
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Ad Soyad"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email Alanı */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Şifre Alanı */}
                <div>
                  <label htmlFor="password" className="sr-only">
                    Şifre
                  </label>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Şifre"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Şifreyi Tekrar Girin Alanı */}
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Şifreyi Tekrar Girin
                  </label>
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Şifreyi Tekrar Girin"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

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
                    className="font-medium text-secondary hover:text-primary"
                  >
                    Şifrenizi mi unuttunuz?
                  </a>
                </div>
              </div>

              <div>
                <CustomButton
                  type="submit"
                  className="bg-gray-900 hover:bg-primary text-white w-full py-2 rounded-md"
                >
                  Devam et
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-center text-gray-400">
          Zaten bir hesabınız var mı?{" "}
          <a href="#" 
           onClick={()=>{
            setPage('login');
          }}
          className="text-secondary hover:text-primary">
            Giriş Yap
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
