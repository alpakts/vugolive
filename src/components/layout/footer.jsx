import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col space-y-10 justify-center p-5 m-4  ">

    <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <Link className="hover:text-primary underline" href="/privacy">Privacy</Link>
        <Link className="hover:text-primary underline" href="/terms">Terms</Link>
        <Link className="hover:text-primary underline" href="/sales">Mesafeli Satış Sözleşmesi</Link>
        <Link className="hover:text-primary underline" href="/kvkk">KVKK, İptal Sözleşmesi</Link>
    </nav>
   
    <p className="text-center text-gray-700 font-medium">&copy; 2022 Vugo Live All rights reservered.</p>
   {/* <div className="flex justify-around p-4 space-x-2">
   <a className="bg-white" href="https://www.gpay.com.tr" target="blank" title="www.gpay.com.tr | Gpay "><Image src="https://www.gpay.com.tr/assets/gpay_logo/kredikarti.png" target="blank" title="www.gpay.com.tr | Gpay" width={300} height={300} className="h-8 w-auto" alt="www.gpay.com.tr | Gpay "/></a>
    <a className="bg-white" href="https://www.gpay.com.tr" target="blank" title="www.gpay.com.tr | Gpay "><Image src="https://www.gpay.com.tr/assets/gpay_logo/logo_gpay_minik.png" target="blank" title="www.gpay.com.tr | Gpay" width={300} height={300} className="h-8 w-auto"  alt="www.gpay.com.tr | Gpay "/></a>
   </div> */}
</footer>
  );
};

export default Footer;
