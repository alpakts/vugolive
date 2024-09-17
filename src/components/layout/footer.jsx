import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer class="flex flex-col space-y-10 justify-center p-5 border-t-[1px] m-4  border-primary ">

    <nav class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <Link class="hover:text-primary underline" href="/privacy">Privacy</Link>
        <Link class="hover:text-primary underline" href="/terms">Terms</Link>
        <Link class="hover:text-primary underline" href="/sales">Mesafeli Satış Sözleşmesi</Link>
        <Link class="hover:text-primary underline" href="kvkk">Kvkk, İptal Sözleşmesi</Link>
 
    </nav>
  
    <p class="text-center text-gray-700 font-medium">&copy; 2022 Vugo Live All rights reservered.</p>
</footer>
  );
};

export default Footer;
