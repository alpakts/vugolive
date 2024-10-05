import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
      if (user == -1) {
        const callbackUrl = window.location.pathname;
        router.push(`/auth?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return;
      }

  

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
