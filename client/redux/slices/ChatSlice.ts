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
    updateCurrentChat: (state, action) => {
      state.primaryChatter = action.payload.currentChatter;
      state.secondaryChatter = action.payload.secondaryChatter;
    },
  },
});

export const { updateCurrentChat } = CHAT_SLICE.actions;
export default CHAT_SLICE.reducer;
