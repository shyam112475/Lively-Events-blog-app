
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
export const fetchComments = createAsyncThunk('fetch/comments',async()=>{
    const response = await fetch('http://localhost:3000/comments');
    const data =await response.json()
    return data
})
const CommentSlice = createSlice({
    name:'comments',
    initialState:{
        comments:[],
        status:'idle',
        error:null
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchComments.pending,(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase(fetchComments.fulfilled,(state,action)=>{
            state.status = 'idle'
            state.comments = action.payload
        })
        .addCase(fetchComments.rejected,(state)=>{
            state.status = 'somthong went wrong'
        })
    }
    
})

export default CommentSlice.reducer
