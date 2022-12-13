import { SET_USER_FIRSTNAME, SET_USER_LASTNAME, SET_USER_EMAIL,SET_USER_ISCONNECT } from './action';
import createReducer from '../app/lib/createReducer';


const initialState = {
    isconnect: false,
    firstname: '',
    lastname: '',
    email: '',
}

export const userReducer = createReducer(initialState, { 
    [SET_USER_FIRSTNAME](state, action) {
        return {
            ...state, 
            firstname: action.payload
        };
    },
    [SET_USER_LASTNAME](state, action) {
        return {
            ...state, 
            lastname: action.payload
        };
    },
    [SET_USER_EMAIL](state, action) {
        return {
            ...state, 
            email: action.payload 
        };
    },
    [SET_USER_ISCONNECT](state, action) {
        return {
            ...state, 
            isconnect: action.payload
        };
    }
});