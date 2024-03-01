import React, { FC, useState } from "react";
import useAuth from "@/lib/hooks/authUser";
import useRoutine from "@/lib/hooks/useRoutine";
import { verifyUpgradeSub } from "@/lib/service/api/subApi";
import { formatAsNgnMoney } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";

interface Props{
    name: string
    close: () => void
}
const PaymentModal:FC<Props> = ({name, close}) => {
  const { user, userId } = useAuth();
  const { payInfo, saveSub, activeSub } = useRoutine();
  const [isBusy, setIsBusy] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: Math.round(payInfo.amount) * 100,
    publicKey: "pk_live_6483fcd718a63523c1e9c98650e813c101fef2f2",
  };
  const initializePayment = usePaystackPayment(config);
  // you can call this function anything
  const onSuccess = (reference: any) => {
    setIsBusy(true)
    const payload = {
      userId: userId,
      reference: reference.reference,
      amountpaid: payInfo.amount,
      newExpiryDate: payInfo.expDate,
      TransactionId: payInfo.transId,
      planId: payInfo.plandId,
    };
    confirmPays.mutate(payload);
  };

  // you can call this function anything
  const onClose = () => {
    console.log("closed");
  };
  const confirmPays = useMutation({
    mutationFn: verifyUpgradeSub,
    mutationKey: ["verifySub"],
    onSuccess: (data) => {
      setIsBusy(false)
      saveSub({
        ...activeSub,
        planId: payInfo?.plandId
      })
      toast.success("Subscription Upgraded Successfully");
      close()
    },
    onError: (error:any) => {
      toast.error(error.response.data.message)
    },
  });
  return (
    <>
      <div>
        <p className="text-black text-center px-5 mb-8">You're about to pay <span className="fw-600">{formatAsNgnMoney(payInfo.amount)}</span> for <span className="fw-600">{name}</span> subscription</p>
        <div>
          <button
            className="bg-primary text-white fw-500 w-full py-3 rounded-[200px]"
            onClick={() => {
              initializePayment({onSuccess, onClose});
            }}
          >
            {isBusy? 'Initializing...' : 'Continue'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
