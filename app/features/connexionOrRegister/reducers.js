import createReducer from '../../../app/lib/createReducer';
import { CONNEXION_ON,SET_USER_EMAIL,SET_USER_FIRSTNAME,SET_USER_ISCONNECT,SET_USER_LASTNAME } from './types';


const initialState = {
   connexionOn  : ''
}

export const ConnexionReducer = createReducer(initialState, { 
    [CONNEXION_ON](state, action) {
        return {
            ...state, 
        };
    },
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