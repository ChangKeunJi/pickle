import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_MY_DIR_FAILURE,
  LOAD_MY_DIR_REQUEST,
  LOAD_MY_DIR_SUCCESS,
  ADD_DIR_FAILURE,
  ADD_DIR_REQUEST,
  ADD_DIR_SUCCESS,
} from "../reducers/directory";

// ===== 사용자 카테고리 불러오기

async function loadDirAPI() {
  return axios.get("/directory");
}

function* loadDir() {
  try {
    const result = yield call(loadDirAPI);

    yield put({
      type: LOAD_MY_DIR_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_DIR_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadDir() {
  yield takeLatest(LOAD_MY_DIR_REQUEST, loadDir);
}

// ===== 카테고리 추가하기

async function addDirAPI(data) {
  return axios.post("/directory", data);
}

function* addDir(action) {
  try {
    const result = yield call(addDirAPI, action.data);

    yield put({
      type: ADD_DIR_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_DIR_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddDir() {
  yield takeLatest(ADD_DIR_REQUEST, addDir);
}

export default function* directorySaga() {
  yield all([fork(watchLoadDir), fork(watchAddDir)]);
}
