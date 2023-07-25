import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, deleteUser, fetchUserById, fetchUsers, updateUser } from './userAPI';

const initialState = {
  userInfo: [],
  status: '',
  totalUsers: null,
  selectedUser: {},
  error: '',
  success: false,
};

export const fetchUsersAsync = createAsyncThunk(
  'user/fetchUser',
  async ({ sort, pagination }) => {
    const response = await fetchUsers(sort, pagination);
    return response.data;
  }
);
export const fetchUserByIdAsync = createAsyncThunk(
  'user/fetchUserById',
  async (id) => {
    const response = await fetchUserById(id);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ user, alert }) => {
    const response = await updateUser(user);
    alert.success("User Updated");
    return response.data;
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async ({ user, alert }) => {
    const response = await createUser(user);
    alert.success("User Created");
    return response.data;
  }
);

export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async ({ id, alert }) => {
    const response = await deleteUser(id);
    alert.success("User Deleted Successfully")
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedUser = action.payload;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        state.error = '';
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        state.error = '';
        state.success = true
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })

  },
});

export default userSlice.reducer;
