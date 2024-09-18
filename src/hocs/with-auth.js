"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
      if (user == -1) {
        const callbackUrl = window.location.pathname;
        router.push(`/auth?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      }
    }, [user]);

  

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
