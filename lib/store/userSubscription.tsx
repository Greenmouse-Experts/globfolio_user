import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  payInfo: PayProps;
  subInfo: SubProps;
  saveSub: (data: SubProps) => void;
  savePayInfo: (data: PayProps) => void;
  clearSub: () => void;
}

interface PayProps {
  amount: number;
  expDate: string;
  transId: string;
  plandId: string;
}
interface SubProps {
  amount: number;
  createdAt: string;
  deletedAt: string | null;
  expiredAt: string | null;
  id: string;
  planId: string;
  status: boolean;
  updatedAt: string;
  userId: string;
}
const subInitState = {
  amount: 0,
  createdAt: "",
  deletedAt: "",
  expiredAt: "",
  id: "",
  planId: "",
  status: false,
  updatedAt: "",
  userId: "",
};
const payInfoInitState = {
  amount: 0,
  expDate: "",
  transId: "",
  plandId: ""
}
const useSubStore = create<Props>()(
  persist(
    (set) => ({
      payInfo: payInfoInitState,
      subInfo: subInitState,
      saveSub: (data: SubProps) =>
        set(() => ({
          subInfo: data,
        })),
      savePayInfo: (data: PayProps) =>
        set(() => ({
          payInfo: data,
        })),
      clearSub: () =>
        set(() => ({
          subInfo: subInitState,
        })),
    }),
    {
      name: "glob_user_sub",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSubStore;
