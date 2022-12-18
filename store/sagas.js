/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
 import { all } from 'redux-saga/effects';
import { searchBarSagas } from '../app/features/search/sagas';
import { connexionSagas } from '../app/features/connexionOrRegister/sagas';

export default function* rootSaga() {
   
   yield all([...connexionSagas,...searchBarSagas]);
 }
  