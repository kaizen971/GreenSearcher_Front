import { SET_USER_FIRSTNAME, SET_USER_AGE, INCREASE_AGE, SET_USER_LASTNAME, SET_USER_EMAIL,SET_USER_ISCONNECT } from './action';

const initialState = {
    isconnect: false,
    firstname: '',
    lastname: '',
    email: '',
    age: 0,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_FIRSTNAME:
            return { ...state, firstname: action.payload };
        case SET_USER_LASTNAME:
                return { ...state, lastname: action.payload };
        case SET_USER_EMAIL:
            return { ...state, email: action.payload };
        case SET_USER_ISCONNECT:
            return { ...state, isconnect: action.payload };
        case SET_USER_AGE:
            return { ...state, age: action.payload };
        case INCREASE_AGE:
            return { ...state, age: state.age + 1 };
        default:
            return state;
    }
}

export default userReducer;