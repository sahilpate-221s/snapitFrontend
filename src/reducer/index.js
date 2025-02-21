import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'; // Import persistReducer
import storage from 'redux-persist/lib/storage'; // LocalStorage (or sessionStorage)
import { createMigrate } from 'redux-persist'; // For handling migrations

// Import your reducers
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import postsReducer from '../slices/postSlice';
import collectionsReducer from '../slices/collectionSlice';

// Define your migrations
const migrations = {
  0: (state) => {
    if (state.auth.token) {
      const { token, expiry } = state.auth.token;
      const currentTime = new Date().getTime();

      console.log('Current time:', currentTime);
      console.log('Token expiry time:', expiry);

      // If token is expired, clear it
      if (currentTime > expiry) {
        console.log('Token expired. Clearing token.');
        return {
          ...state,
          auth: {
            ...state.auth,
            token: null,
          },
        };
      }
    }
    return state;
  },
};


// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage, // LocalStorage (or sessionStorage)
  whitelist: ['auth', 'profile', 'posts'], // Add reducers that should be persisted
  version: 1,
  migrate: createMigrate(migrations, { debug: true }), // Apply migrations
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  collections: collectionsReducer,
});

// Persist the root reducer with persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
