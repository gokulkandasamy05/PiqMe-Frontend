// userSlice.ts
import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  firstName: string
  lastName: string
  _id: string
  emailId: string,
  image: string,
  about: String
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  _id: '',
  emailId:'',
  image:'',
  about:''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state._id = action.payload._id
      state.emailId = action.payload.emailId
      state.image = action.payload.image
    },
    clearUser(state) {
      state.firstName = ''
      state.lastName = ''
      state._id = ''
      state.emailId = ''
      state.image = ''
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
