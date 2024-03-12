import { create } from "zustand";

interface ChatState {
  chat: chatProps[];

  addChat: (item: chatProps[]) => void;

  clearChat: () => void;
}
interface chatProps {
  sender: any;
  owner: string;
  username: string;
  message: string;
  createdAt: string;
  id: string;
  files: any;
  reply: any;
}
const chatInitState = [] as chatProps[];

const useChatStore = create<ChatState>((set) => ({
  chat: chatInitState,

  addChat: (data: chatProps[]) => set((state) => ({ chat: data })),

  clearChat: () => set((state) => ({ chat: [] })),
}));

export default useChatStore;
