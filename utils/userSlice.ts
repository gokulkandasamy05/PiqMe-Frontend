// userSlice.ts
import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  firstName: string
  lastName: string
  _id: string
  emailId: string
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  _id: '',
  emailId:''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName,
      state._id = action.payload._id,
      state.emailId = action.payload.emailId
    },
    clearUser(state) {
      state.firstName = ''
      state.lastName = ''
      state._id = ''
      state.emailId = ''
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
