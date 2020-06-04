import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { dashboardSlice} from './reducers/dashboardReducer';
import { userSlice} from './reducers/userReducer';

const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
})