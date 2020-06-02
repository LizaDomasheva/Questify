import {createSlice} from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        today: [],
        tomorrow: [],
        done: [],
        allTheRest: []
    },
reducers: {
    addCardReducer: (state, {payload}) => ({...state}),
    removeCardReducer: (state, {payload}) => ({...state}),
    editCardReducer: (state, {payload}) => ({...state}),
    filterCardReducer: (state, {payload}) => ({...state}),
}
})