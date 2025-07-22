import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import commonReducer from './commonSlice'
import localStorage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const rootReducer = combineReducers({
    user : userReducer,
    common: commonReducer
})


const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['user'], // only persist the 'user' slice
};


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch