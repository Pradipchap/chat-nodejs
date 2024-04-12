import {
  FriendBoxInterface,
  UserFetchResults,
} from "../../interfaces/dataInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_BASE_URL } from "../../utils/constants";
import { updateSecondaryChatter } from "./ChatSlice";
interface users {
  users: FriendBoxInterface[];
  loading: boolean;
  error: boolean;
}
export const fetchChatters = createAsyncThunk(
  "users",
  async (primaryChatter: string, { dispatch }) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/users`);
      const { users }: UserFetchResults = await response.json();
      const finalUsers = users.filter((user) => {
        return user._id !== primaryChatter;
      });
      dispatch(updateSecondaryChatter(finalUsers[0]._id));
      return finalUsers;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

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
  extraReducers(builder) {
    builder.addCase(fetchChatters.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
  },
});

export const { updateUsers, setLoading, setError } = USER_SLICE.actions;
export default USER_SLICE.reducer;
