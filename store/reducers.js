/*
 * combines all th existing reducers
 */

import {userReducer} from "../redux/reducers";
import {ConnexionReducer} from '../components/items/Connexion/Connexionredux/reducer';
import { SearchBarReducer } from "../app/features/search/reducers";


export default Object.assign({}, {
    userReducer: userReducer,
    ConnexionReducer:ConnexionReducer,
    SearchBarReducer:SearchBarReducer
}    
);