import { CONNEXION_ON } from "./types";


export function connexionOn() {
    
    return {
        type: CONNEXION_ON,
        };
}

export const setfirstName = firstname => dispatch => {
    dispatch({
        type: SET_USER_FIRSTNAME,
        payload: firstname,
    });
};

export const setlastName = lastname => dispatch => {
    dispatch({
        type: SET_USER_LASTNAME,
        payload: lastname,
    });
};

export const setEmail = email => dispatch => {
    dispatch({
        type: SET_USER_EMAIL,
        payload: email,
    });
};

export const setisConnect = isconnect => dispatch => {
    dispatch({
        type: SET_USER_ISCONNECT,
        payload: isconnect,
    });
};


