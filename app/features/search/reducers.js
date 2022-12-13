import createReducer from '../../../app/lib/createReducer';
import { CHANGE_TEXT,PRODUCT_RESPONSE_OK,PRODUCT_RESPONSE_FAILED } from './types';


const initialState = {
   text: '',
   isLoading: false,
   data:null,
}

export const SearchBarReducer = createReducer(initialState, { 
   
    [CHANGE_TEXT](state, action) {
        return {
            ...state, 
            text:action.payload.text,
            isLoading:true
        };
    },
    [PRODUCT_RESPONSE_FAILED](state, action) {
        return {
            ...state, 
            isLoading:false
        };
    },
    [PRODUCT_RESPONSE_OK](state, action) {
        return {
            ...state, 
            data:action.payload.data,
            isLoading:false
        };
    },

});