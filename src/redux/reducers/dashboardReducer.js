import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        today: [],
        tomorrow: [],
        done: [],
        allTheRest: []
        
    },
reducers: {
    addCardReducer: (state, {payload}) => ({...state, today: [...state.today, payload].reverse()}),
    removeCardReducer: (state, {payload}) => ({...state, today: state.today.filter((card) => card._id !== payload)}),
    editCardReducer: (state, {payload}) => ({...state}),
    filterCardReducer: (state, {payload}) => (console.log('done :>> ', state.done), {...state, done: payload}),
    filterCardReducerToday: (state, {payload}) => (console.log('doneNew :>> ', state), {...state, today: payload.today, tomorrow: payload.tomorrow, allTheRest: payload.allTheRest, done: [...state.done, ...payload.doneNew] }),
}
})
