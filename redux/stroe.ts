import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from "./userDetailsSlice";

const store = configureStore({
  reducer: {
    user: userDataSlice,  // Changed from 'dashboard' to 'user' to match slice name
  },
});

// Export store and types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;