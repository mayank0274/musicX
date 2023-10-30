import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Track } from "../../types/Track";

export const STATES = {
    IDLE:"idle",
    LOADING:"loading",
    ERROR:"error",
    COMPLETE:"complete"
};



 interface INITIALSTATE{
    songs:Track[],
    status:string
}

const songsSlice = createSlice({
    initialState:{
        songs:[],
        status:STATES.IDLE
    } as INITIALSTATE,
    name:"songs",
    reducers:{
        getSongs(state,action){
             state.songs = action.payload;
            
        },
        setStatus(state,action){
            state.status = action.payload;
        }
    }

});

export default songsSlice.reducer;
export const { getSongs,setStatus } = songsSlice.actions;

export function fetchSongs():Function{
    return async function fetchSongsThunk(dispatch: (arg0: { payload: any; type: "songs/getSongs" | "songs/setStatus"; }) => void):Promise<void>{
        dispatch(setStatus(STATES.LOADING));
        try {
            const res = await axios({
                url:"https://shazam.p.rapidapi.com/charts/track",
                headers:{
                "X-RapidAPI-Host":"shazam.p.rapidapi.com",
                "X-RapidAPI-Key":import.meta.env.VITE_API_KEY
                },
                params: {
                    locale: 'en-US',
                    pageSize: '24',
                    startFrom: '20'
                  },
                method:"GET"
            });
            
            if(res.data){
               dispatch(setStatus(STATES.COMPLETE));
               dispatch(getSongs(res.data.tracks));
               
            }
           
        } catch (error) {
            dispatch(setStatus(STATES.ERROR));
        }
    }
}


