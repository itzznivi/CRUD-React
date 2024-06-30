import { createSlice, configureStore } from "@reduxjs/toolkit";

const CrudApp = createSlice({
  name: "Crud-app",
  initialState: {
    users: [],
    counter: 0
  },
  reducers: { 
    add: (state, action) => {
      state.users.push({ id: action.payload.id, name: action.payload.name, age: action.payload.age, email: action.payload.email });
    },
    remove: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload.id);
    },
    update: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.data };
      }
    }
  }
});

export const { add, remove, update } = CrudApp.actions;

const store = configureStore({
  reducer: {
    crud: CrudApp.reducer
  }
});

export default store;
