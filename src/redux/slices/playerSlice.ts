import { Track } from './../../types/Track';
import { createSlice } from "@reduxjs/toolkit";


interface INITIALSTATE {
    isPlaying:boolean;
    activeSong : Track;
    currentIndex : number;
    isActive:boolean,
    currentSongs:Track[]
};

const initialState:INITIALSTATE = {
    isPlaying:false,
    activeSong:{},
    currentIndex:0,
    isActive:false,
    currentSongs:[]
};

const playerSlice = createSlice({
    name:"player",
    initialState:initialState,
    reducers:{
        setActiveSong(state,action){
            let songDetails = action.payload;
            state.activeSong = songDetails.song;
            state.currentIndex = songDetails.index;
            state.isActive = true;
            state.isPlaying = false;
            state.currentSongs = songDetails.currentSongs;
            
        },
        handlePlayPause(state,action){
            state.isPlaying = action.payload.status;
        },
        handleNextSong(state,action){
            state.activeSong = state.currentSongs[action.payload];
            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = false;
        },
        handlePrevSong(state,action){
            state.activeSong = state.currentSongs[action.payload];
            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = false;
        }
    }
  
});

export const {setActiveSong,handlePlayPause,handleNextSong,handlePrevSong} = playerSlice.actions;
export default playerSlice.reducer;