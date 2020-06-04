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
    removeCardReducer: (state, {payload}) => ({...state.filter((card) => card._id !== payload)}),
    editCardReducer: (state, {payload}) => ({...state}),
    filterCardReducer: (state, {payload}) => ({...state, done: payload}),
    filterCardReducerToday: (state, {payload}) => ({...state, today: payload.today, tomorrow: payload.tomorrow, allTheRest: payload.allTheRest, done: [...state.done, ...payload.doneNew], }),
}
})