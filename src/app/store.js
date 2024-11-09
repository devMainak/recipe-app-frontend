import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { recipesSlice } from "../features/recipes/recipes.slice";

// Defining persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

// Combining reducers
const rootReducer = combineReducers({
  recipes: recipesSlice.reducer,
});

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cofiguring the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Creating persistor
export const persistor = persistStore(store);

export default store;
