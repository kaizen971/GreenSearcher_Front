/*
 * combines all th existing reducers
 */

import {userReducer} from "../redux/reducers";
import {ConnexionReducer} from  "../app/features/connexionOrRegister/reducers";
import { SearchBarReducer } from "../app/features/search/reducers";


export default Object.assign({}, {
    userReducer: userReducer,
    ConnexionReducer:ConnexionReducer,
    SearchBarReducer:SearchBarReducer
}    
);