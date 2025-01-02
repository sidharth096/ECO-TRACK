import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the user state interface
interface UserState {
  email: string;
  password: string;
  rationCard: string;
  members: string[];
  devices: string[];
  averageWater: number;
  averageElectricity: number;
}

// Initial state
const initialState: UserState = {
  email: "",
  password: "",
  rationCard: "",
  members: [],
  devices: [],
  averageWater: 0,
  averageElectricity: 0,
};

// Async actions for storing and loading user data
export const saveUserToStorage = createAsyncThunk<UserState, UserState>(
  "user/saveUserToStorage",
  async (userDetails) => {
    await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
    return userDetails;
  }
);

export const loadUserFromStorage = createAsyncThunk<UserState>(
  "user/loadUserFromStorage",
  async () => {
    const userDetails = await AsyncStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : initialState;
  }
);

export const clearUserFromStorage = createAsyncThunk<void>(
  "user/clearUserFromStorage",
  async () => {
    await AsyncStorage.removeItem("userDetails");
  }
);

// Slice definition
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      const { email, password, rationCard, members, devices, averageWater, averageElectricity } = action.payload;
      state.email = email;
      state.password = password;
      state.rationCard = rationCard;
      state.members = members;
      state.devices = devices;
      state.averageWater = averageWater;
      state.averageElectricity = averageElectricity;
    },
    clearUserDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserToStorage.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(clearUserFromStorage.fulfilled, () => {
        return initialState;
      });
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
