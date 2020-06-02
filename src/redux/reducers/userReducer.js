import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        nickName: null,
        dashboardListId: null
    },
reducers: {
    loginUser: (state, {payload}) => ({...state}),
    logOutUser: (state, {payload}) => ({...state}),
}
})
