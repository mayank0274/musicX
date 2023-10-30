import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./slices/songsSlice";
import playerSlice from "./slices/playerSlice";

 export const store = configureStore({
    reducer:{
        songs : songsSlice,
        player:playerSlice
    }
});

export type RootState = ReturnType<typeof store.getState>