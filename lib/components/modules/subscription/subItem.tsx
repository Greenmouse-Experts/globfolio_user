import React, { FC, useState } from "react";
import { SubItemType } from "@/lib/contracts/subs";
import { formatAsNgnMoney } from "@/lib/utils";
import { FaAward, FaCircleCheck } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { upgradeSub } from "@/lib/service/api/subApi";
import useAuth from "@/lib/hooks/authUser";
import { toast } from "react-toastify";
import useRoutine from "@/lib/hooks/useRoutine";
import useModal from "@/lib/hooks/useModal";
import PaymentModal from "./paymentModal";

interface Props {
  item: SubItemType;
}
const SubItem: FC<Props> = ({ item }) => {
  const { userId, user } = useAuth();
  const { savePayDetails } = useRoutine();
  const [isBusy, setIsBusy] = useState(false);
  // payment modal
  const { Modal, setShowModal } = useModal();
  const intiateSub = useMutation({
    mutationFn: upgradeSub,
    mutationKey: ["ugradeSub"],
  });

  // first action to send planid and userid to the backend
  const upgradeAction = () => {
    setIsBusy(true);
    const payload = {
      userId: userId,
      planId: item.id,
    };
    intiateSub.mutate(payload, {
      onSuccess: (data) => {
        savePayDetails({
          transId: data.data.TransactionId,
          amount: data.data.amountpaid,
          expDate: data.data.newExpiryDate,
          plandId: data.data.planId,
        });
        setShowModal(true);
        setIsBusy(false);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <>
      <div className="rounded-lg bg-white">
        <div className="rounded-t-lg w-full text-white bg-primary relative py-12 text-center">
          <div className=" w-full flex justify-center">
            <div className="w-10 h-10 lg:h-16 lg:w-16 circle bg-white place-center text-orange-500">
              <FaAward className="text-xl lg:text-2xl" />
            </div>
          </div>
          <p className="mt-3 fw-500 lg:text-lg">{item.name}</p>
          <p className="text-lg mt-5 fw-600">{formatAsNgnMoney(item.amount)}</p>
        </div>
        <div className="px-4 py-12 grid gap-4">
          {item.benefits.map((item, i) => (
            <div className="flex justify-between">
              <p>{item.benefit}</p>
              <p>
                <FaCircleCheck className="text-xl text-green-600 shrink-0" />
              </p>
            </div>
          ))}
        </div>
        <div className="px-3 pb-5">
          <button
            className="bg-primary text-white fw-500 w-full py-3 rounded-[200px]"
            onClick={upgradeAction}
          >
            {isBusy ? "Upgrading..." : "Get Started"}
          </button>
        </div>
      </div>
      <Modal title="" size="xs">
        <PaymentModal close={() => setShowModal(false)} name={item.name} />
      </Modal>
    </>
  );
};

export default SubItem;
