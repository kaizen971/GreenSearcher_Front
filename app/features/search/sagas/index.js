import {  takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import {connexionSaga} from './searchSagas';

export const searchBarSagas = [takeLatest(types.CONNEXION_ON, connexionSaga)];