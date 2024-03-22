import { createSlice } from "@reduxjs/toolkit";
interface CurrentChatInterface {
  primaryChatter: string;
  secondaryChatter: string;
  chats: string[];
}

const CHAT_SLICE = createSlice({
  name: "chat",
  initialState: <CurrentChatInterface>{
    primaryChatter: "",
    secondaryChatter: "",
    chats: [""],
  },
  reducers: {
    updateCurrentChatter: (state, action) => {
      state.primaryChatter = action.payload.primaryChatter;
      state.secondaryChatter = action.payload.secondaryChatter;
    },
    updateChats: (state, action) => {
      state.chats = action.payload.chats;
    },
  },
});

export const { updateCurrentChatter, updateChats } = CHAT_SLICE.actions;
export default CHAT_SLICE.reducer;
