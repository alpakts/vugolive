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
</footer>
  );
};

export default Footer;
