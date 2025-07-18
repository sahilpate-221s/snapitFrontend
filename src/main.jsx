import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from './reducer'; // Make sure this path is correct
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { clearToken } from './slices/authSlice'; // Import clearToken

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
});

const persistor = persistStore(store);

// Function to clear token if expired before the app starts
const onBeforeLift = () => {
  const state = store.getState(); // Get the current state from the store
  const token = state.auth.token;

  if (token && token.expiry < new Date().getTime()) {
    store.dispatch(clearToken()); // Dispatch action to clear token if expired
  }
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
