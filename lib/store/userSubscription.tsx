import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  subInfo: SubProps;
  saveSub: (data: SubProps) => void;
  clearSub: () => void;
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
const useSubStore = create<Props>()(
  persist(
    (set) => ({
      subInfo: subInitState,
      saveSub: (data: SubProps) =>
        set(() => ({
          subInfo: data,
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
