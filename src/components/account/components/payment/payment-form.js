// components/DiamondPage.js
"use client";

import { valletRequest } from "@/lib/services/api-service";
import { useState } from "react";
import Loading from "@/app/(app)/loading";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaChevronLeft } from "react-icons/fa";

const PaymentForm = async ({diamond,setStep}) => {
  const [loading, setLoading] = useState(false); // Control loading state
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const router = useRouter();

  // Yup validation schema
  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Telefon numarası zorunludur")
      .matches(/^\d{10}$/, "Telefon no 10 rakamdan oluşmalıdır"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    if (apiUser) {
      try {
        const response = await valletRequest(
            diamond.price,
          apiUser.fullName.split(" ")[0],
          apiUser.fullName.split(" ")[1] ?? apiUser.fullName.split(" ")[0],
          diamond.diamond,
          values.phone,
          apiUser.email
        );
        localStorage.setItem("amount", diamond.diamond);
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
    <div className="flex justify-start gap-2"><FaChevronLeft size={24} onClick={() => setStep(0)} /><span>geri</span></div>
      <h2 className="text-xl font-bold mb-4">Ödeme Formu</h2>
      <Formik
        initialValues={{ name: "", surname: "", phone: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="flex space-x-4 justify-center">
            Tutar : {parseFloat(diamond.price).toFixed(2)} TL -
            Elmas : {diamond.diamond}
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
