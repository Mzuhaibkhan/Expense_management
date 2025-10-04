import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';
import { usersService } from '@/services/usersService';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    companyId: 'company-1',
  },
];

const initialState: UsersState = {
  users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')!) : mockUsers,
  loading: false,
  error: null,
};

// Async thunks for Supabase operations
export const fetchUsers = createAsyncThunk('users/fetchAll', async (companyId?: string) => {
  if (companyId) {
    return await usersService.getByCompany(companyId);
  }
  return await usersService.getAll();
});

export const createUser = createAsyncThunk('users/create', async (userData: Omit<User, 'id'> & { password: string }) => {
  return await usersService.create(userData);
});

export const updateUserAsync = createAsyncThunk('users/update', async (payload: { user: User; password?: string }) => {
  return await usersService.update(payload.user, payload.password);
});

export const deleteUserAsync = createAsyncThunk('users/delete', async (userManagerId: string) => {
  await usersService.delete(userManagerId);
  return userManagerId; // Return manager_id for filtering
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      localStorage.setItem('users', JSON.stringify(action.payload));
    },
    // Keep legacy sync actions for backward compatibility
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      localStorage.setItem('users', JSON.stringify(action.payload));
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch users';
    });

    // Create user
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create user';
    });

    // Update user
    builder.addCase(updateUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update user';
    });

    // Delete user
    builder.addCase(deleteUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      // Filter by databaseId since that's our PK in the database
      state.users = state.users.filter((u) => u.databaseId !== action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    });
    builder.addCase(deleteUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete user';
    });
  },
});

export const { setUsers, addUser, updateUser, deleteUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;