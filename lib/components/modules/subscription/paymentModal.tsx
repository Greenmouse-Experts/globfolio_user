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
const PaymentModal:FC<Props> = ({name}) => {
  const { user, userId } = useAuth();
  const { payInfo, saveSub, activeSub } = useRoutine();
  const [isBusy, setIsBusy] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: Math.round(payInfo.amount),
    publicKey: "pk_test_70cf0795ca6e85623f308dd24791ca18064e9986",
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
        planId: payInfo.plandId
      })
      toast.success("Subscription Upgraded Successfully");
      close()
    },
    onError: (error:any) => {
      toast.error(error.response.data.message)
      console.log(error);
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
