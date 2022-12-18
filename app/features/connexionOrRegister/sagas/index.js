import {  takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import {connexionSaga} from './connexionOrRegisterSagas';

export const connexionSagas = [takeLatest(types.CONNEXION_ON, connexionSaga)];