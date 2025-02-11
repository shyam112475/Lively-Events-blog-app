
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
export const fetchLikes = createAsyncThunk('fetch/likes',async()=>{
    const response = await fetch('http://localhost:3000/likes');
    const data =await response.json()
    return data
})
const LikeSlice = createSlice({
    name:'likes',
    initialState:{
        likes:[],
        status:'idle',
        error:null
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLikes.pending,(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase(fetchLikes.fulfilled,(state,action)=>{
            state.status = 'idle'
            state.likes = action.payload
        })
        .addCase(fetchLikes.rejected,(state)=>{
            state.status = 'somthong went wrong'
        })
    }
    
})

export default LikeSlice.reducer
