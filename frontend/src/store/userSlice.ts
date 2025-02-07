import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definišemo interfejs korisnika
interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

// Postavljamo početno stanje kao objekat umesto direktnog `null`
const initialState: { user: User | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Postavljamo korisnika direktno u state.user
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // Brišemo korisnika prilikom odjave
    logout: (state) => {
      state.user = null;
    },
  },
});

// Izvoz akcija i reducera
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
