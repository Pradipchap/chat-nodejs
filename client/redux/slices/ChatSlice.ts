import { createSlice } from "@reduxjs/toolkit";
interface CurrentChatInterface {
  primaryChatter: string;
  secondaryChatter: string;
  chats:{ message: string; isReceiver: boolean }[];
}

const CHAT_SLICE = createSlice({
  name: "chat",
  initialState: <CurrentChatInterface>{
    primaryChatter: "",
    secondaryChatter: "",
    chats: <{ message: string; isReceiver: boolean }[]>[],
  },
  reducers: {
    updateCurrentChatter: (state, action) => {
      state.primaryChatter = action.payload.primaryChatter;
      state.secondaryChatter = action.payload.secondaryChatter;
    },
    updateChats: (state, action) => {
      state.chats.push(action.payload);
    },
  },
});

export const { updateCurrentChatter, updateChats } = CHAT_SLICE.actions;
export default CHAT_SLICE.reducer;
