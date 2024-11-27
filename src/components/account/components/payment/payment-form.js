// components/DiamondPage.js
"use client";

import { valletRequest } from "@/lib/services/api-service";
import { useState } from "react";
import Loading from "@/app/(app)/loading";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PaymentForm = async (diamond) => {
  const [loading, setLoading] = useState(false); // Control loading state
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const router = useRouter();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
    .required("İsim zorunludur")
    .matches(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/, "Sadece harfler kullanılabilir"),
  surname: Yup.string()
    .required("Soyisim zorunludur")
    .matches(/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/, "Sadece harfler kullanılabilir"),
    phone: Yup.string()
      .required("Telefon numarası zorunludur")
      .matches(/^\d{10}$/, "Telefon no 10 rakamdan oluşmalıdır"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    if (apiUser) {
      try {
        const dia = diamond.diamond;
        const response = await valletRequest(
            dia.price,
          values.name,
          values.surname,
          dia.diamond,
          values.phone,
          apiUser.email
        );
        if (response.status !== 200) {
            alert("Ödeme işlemi başarısız oldu");
        }
        localStorage.setItem("amount", dia.diamond);
        router.push(response.data);
      } catch (error) {
        console.error("Error submitting payment:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-xl font-bold mb-4">Ödeme Formu</h2>
      <Formik
        initialValues={{ name: "", surname: "", phone: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium">Ad</label>
                <Field
                  name="name"
                  type="text"
                  className="w-full p-2 rounded border  text-black border-gray-300"
                  placeholder="Ad"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium">
                  Soyad
                </label>
                <Field
                  name="surname"
                  type="text"
                  className="w-full p-2 rounded border  text-black border-gray-300"
                  placeholder="Soyad"
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium">
                Telefon Numarası
              </label>
              <Field
                name="phone"
                type="text"
                className="w-full p-2 rounded border  text-black border-gray-300"
                placeholder="Telefon"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-secondary text-black py-2 px-4 rounded mt-6 hover:bg-primary"
            >
              Onayla
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
