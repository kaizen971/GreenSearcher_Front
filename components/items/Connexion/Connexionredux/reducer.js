import createReducer from '../../../../app/lib/createReducer';
import { CONNEXION_ON } from './types';


const initialState = {
   connexionOn  : ''
}

export const ConnexionReducer = createReducer(initialState, { 
    [CONNEXION_ON](state, action) {
        return {
            ...state, 
        };
    },


});