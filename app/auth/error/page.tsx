import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "@/components/auth/card-wrapper";

const AuthErrorPage = () => {
  return (
    <CardWrapper
      headerLabel="Oops! something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
      showSocial={false}
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive"></ExclamationTriangleIcon>
      </div>
    </CardWrapper>
  );
};

export default AuthErrorPage;
