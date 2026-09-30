import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import categories from "./categories/categoriesSlice"
import products  from './products/productsSlice'
import cart from './cart/cartSlice'

const storage = {
  getItem: (key: string) =>
    Promise.resolve(localStorage.getItem(key)),

  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve(value);
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};


const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
}

const rootReducer = combineReducers({
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER',
        ],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)

export  {store, persistor};