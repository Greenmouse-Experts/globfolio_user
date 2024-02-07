import { FC } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/authUser";
import { useRouter } from "next/navigation";
import Button from "../../ui/Button";

interface Props {
  CloseModal: () => void;
}

const LogoutModal: FC<Props> = ({ CloseModal }) => {
  const navigate = useRouter();
  const {signOut} = useAuth()
  const logoutUser = () => {
    signOut();
    toast.success("Logout Successful");
    navigate.push("/auth/login");
  };
  return (
    <div>
      <p className="fw-500 text-center">Are you sure you want to log out</p>
      <div className="flex justify-between mt-10">
        <Button
          title="Cancel"
          onClick={CloseModal}
          altClassName="px-6 py-2 fw-600 text-grad border rounded text-primary hover:scale-x-110 duration-100"
        />
        <Button
          title="Logout"
          altClassName="w-24 py-2 btn-primary hover:scale-x-110 duration-100"
          onClick={logoutUser}
        />
      </div>
    </div>
  );
};

export default LogoutModal;
