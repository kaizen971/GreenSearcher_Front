import { put, call, select, all, delay } from 'redux-saga/effects';
import { getFoodDetail } from '../../../Api/getFoodDetail';
import { responseFailed, responseProductOk } from '../actions';
import { getText } from '../selectors';

export function* searchSaga(action) {
  const text = yield select(getText);
  if(text != ''){
  const response = yield call(getFoodDetail,text);
  
  if(response.status == 200){
    yield put(responseProductOk(response.data));
  }else{
  yield put(responseFailed(response.data))
  setTimeout(() => {
      Alert.alert('GreenSearcher', "Problème avec le serveur");
  }, 200);
  }
  }else{
    yield put(responseProductOk([]));
  }
  }