import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { composeWithDevTools } from "redux-devtools-extension";
import { eventsApi } from "./services/events";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk, eventsApi.middleware];
let store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);
let persistor = persistStore(store);

export { store, persistor };
