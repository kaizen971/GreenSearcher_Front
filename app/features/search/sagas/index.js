import {  takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import {searchSaga} from './searchSagas';

export const searchBarSagas = [takeLatest(types.CHANGE_TEXT, searchSaga)];