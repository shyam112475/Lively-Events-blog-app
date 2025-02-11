import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
export const fetchAuthor = createAsyncThunk('posts/fetchAuthor', async () => {
          const response = await fetch('http://localhost:3000/authors');
          const data = await response.json();
          return data;
})

const AuthorSlice = createSlice({
    name: "authors",
    initialState: { authors: [], status: "idle", error: null },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAuthor.pending,(state)=>{
            state.status = 'loading'
          
        })
        .addCase(fetchAuthor.fulfilled,(state,action)=>{
            state.status = 'loded'
            state.authors = action.payload
        })
        .addCase(fetchAuthor.rejected,(state,action)=>{
            state.status = action.error.message
        })
    }
})

export default AuthorSlice.reducer;