import { combineReducers, Reducer } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { NoopStorage } from "@/shared/interfaces/redux";
import { clearStore } from "@/shared/redux/utils";

import appReducer from "./slices/app";
import socketReducer from "./slices/socket";
import userReducer from "./slices/users";
import { RootState } from "./store";

const createNoopStorage = (): NoopStorage => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const appPersistConfig: PersistConfig<any> = {
  key: "app",
  storage,
  keyPrefix: "redux-",
};

const userPersistConfig: PersistConfig<any> = {
  key: "users",
  storage,
  keyPrefix: "redux-",
};

const reduxAppReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  users: persistReducer(userPersistConfig, userReducer),
  socket: socketReducer,
});

const rootReducer: Reducer<any> = (state, action) => {
  if (action.type === clearStore.type) {
    storage.removeItem("persist:root");
    storage.removeItem("persist:app");
    storage.removeItem("persist:users");
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }

    return reduxAppReducer(undefined, action);
  }

  return reduxAppReducer(state, action);
};

export { rootPersistConfig, rootReducer };

export type { RootState };
