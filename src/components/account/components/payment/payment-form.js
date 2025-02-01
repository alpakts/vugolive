// components/DiamondPage.js
"use client";

import { makePaymentRequest, valletRequest } from "@/lib/services/api-service";
import { useState } from "react";
import Loading from "@/app/(app)/loading";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaChevronLeft } from "react-icons/fa";
import Image from "next/image";

const PaymentForm = async ({diamond,setStep}) => {
  const [loading, setLoading] = useState(false); // Control loading state
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    if (apiUser) {
      try {
        const response = await makePaymentRequest('https://vugolive.com/vallet/success',diamond.price,
        );
        localStorage.setItem("amount", diamond.diamond);
        router.push(response);
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
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="flex space-x-4 justify-center">
            Tutar : {parseFloat(diamond.price).toFixed(2)} TL -
            Elmas : {diamond.diamond}
            </div>
            <button
              type="submit"
              className="bg-secondary text-black py-2 px-4 rounded mt-6 hover:bg-primary"
            >
              Gpay İle Öde
            </button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
