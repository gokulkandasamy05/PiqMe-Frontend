import { createSlice } from "@reduxjs/toolkit";

type CommonInit = {
    isLoading: Boolean
}
const initialState: CommonInit = {
    isLoading: false
}
export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers:{
        setLoader(state, action){
            state.isLoading = action.payload
        }
    }
})

export const {setLoader} = commonSlice.actions
export default commonSlice.reducer 