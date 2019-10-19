import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';

export default function* watcherSaga() {
  yield takeEvery("ADD_LIST", workerSaga);
}

function* workerSaga(action) {
  try {
    const payload = yield call(getData,action);
    const list = {
        title: payload.data.name,
        subTitle: payload.data.name,
        tasks: []
    }
    yield put({ type: "ADD",  list});
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
function getData(action) {
    return axios.get("http://127.0.0.1:8081/process_get",
        { params: {name: action.payload.title}}
    );
}