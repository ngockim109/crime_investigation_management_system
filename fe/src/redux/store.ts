import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/user/userSlice";
import reduxReport from "./reduxReport";
import reduxInitialResponse from "./reduxInitialResponse";
import reduxAuth from "./reduxAuth";
import accountReducer from "./reduxAccount";

const rootReducer = combineReducers({
  user: userReducer,
  report: reduxReport,
  initialResponse: reduxInitialResponse,
  auth: reduxAuth,
  account: accountReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth", "account"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
