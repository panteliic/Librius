import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  message: string;
  sender: boolean;
}

interface MessageState {
  messages: Message[]; 
}

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
