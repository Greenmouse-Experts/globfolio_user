import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props{
    user: userProps;
    saveUser: (data: userProps) => void;
    clearUser: () => void;
}
interface userProps{
    name: string;
    email: string;
    token: string;
    image: string;
    country: string;
    phone: string;
    id: string;
    account: string;
    joined: string;
    email_verify: boolean;
    gender: string;
    username: string;
}
const userInitState = {
    name: '',
    email: '',
    token: '',
    image: '',
    country: '',
    account: '',
    phone: '',
    id: '',
    joined: '',
    email_verify: false,
    gender: '',
    username: ''
}
const useAuthStore = create<Props>()(
  persist(
    (set) => ({
      user: userInitState,
      saveUser: (data:userProps) =>
        set(() => ({
          user: data,
        })),
      clearUser: () =>
        set(() => ({
          user: userInitState,
        })),
    }),
    {
      name: "glob_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
