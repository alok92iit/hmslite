import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import  notify  from "./reducer/notify-reducer";
import  tableRecords  from "./reducer/table-reducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const encryptor = encryptTransform ({
  secretKey: "6b3c5ea6-9dc6-473d-a93b-63e02ac1b1cc-0006b4d5-49c5-4b05-9622-da4d6d76398a", 
  onError: function (error) {
    console.error("Encryption error:", error);
  },
});

const rootReducer:any = combineReducers({
  notify,

   table: tableRecords

});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [encryptor], // Add encrypt transform here
  // blacklist: ['auth'] // optional
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
console.log("cefmekc v ,m kv l   ===",import.meta.env.secretKey)
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
