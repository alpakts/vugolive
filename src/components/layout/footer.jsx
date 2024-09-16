import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer class="flex flex-col space-y-10 justify-center p-5 border-t-[1px]  border-primary rounded-3xl">

    <nav class="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <Link class="hover:text-primary underline" href="/privacy">Privacy</Link>
        <Link class="hover:text-primary underline" href="/terms">Terms</Link>
        <Link class="hover:text-primary underline" href="/sales">Mesafeli Satış Sözleşmesi</Link>
        <Link class="hover:text-primary underline" href="kvkk">Kvkk, İptal Sözleşmesi</Link>
 
    </nav>

    <div class="flex justify-center space-x-5">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
        </Link>
      
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
        </Link>
    </div>
    <p class="text-center text-gray-700 font-medium">&copy; 2022 Vugo Live All rights reservered.</p>
</footer>
  );
};

export default Footer;
