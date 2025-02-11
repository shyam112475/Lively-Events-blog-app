
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
export const fetchPosts = createAsyncThunk('fetch/posts',async()=>{
    const response = await fetch('http://localhost:3000/posts');
    const data =await response.json()
    return data
})

const PostSlice = createSlice({
    name:'posts',
    initialState:{
        posts:[],
        status:'idle',
        error:null
    },
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.status = 'loading'
            state.error = null
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'success'
            state.posts = action.payload
        })
        .addCase(fetchPosts.rejected,(state)=>{
            state.status = 'somthong went wrong'
        })
    }
    
})

export default PostSlice.reducer
