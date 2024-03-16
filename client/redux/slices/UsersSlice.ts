import { FriendBoxInterface } from "../../interfaces/dataInterfaces";
import { createSlice } from "@reduxjs/toolkit";
interface users {
  users: FriendBoxInterface[];
  loading: boolean;
  error: boolean;
}

const USER_SLICE = createSlice({
  name: "users",
  initialState: <users>{ users: [], loading: true, error: false },
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateUsers, setLoading, setError } = USER_SLICE.actions;
export default USER_SLICE.reducer;
