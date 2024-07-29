import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import app from './features/appSlide';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        app,
    },
    devTools: true,
    /* middleware: getDefaultMiddleware({
        serializableCheck: false,
    }), */
});

setupListeners(store.dispatch);
