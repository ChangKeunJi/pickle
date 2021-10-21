import produce from "immer";

const initialState = {
  allDirs: [],
  loadMyDirLoading: false,
  loadMyDirDone: false,
  loadMyDirError: null,
  addDirLoading: false,
  addDirDone: false,
  addDirError: null,
};

export const LOAD_MY_DIR_REQUEST = "LOAD_MY_DIR_REQUEST";
export const LOAD_MY_DIR_SUCCESS = "LOAD_MY_DIR_SUCCESS";
export const LOAD_MY_DIR_FAILURE = "LOAD_MY_DIR_FAILURE";

export const ADD_DIR_REQUEST = "ADD_DIR_REQUEST";
export const ADD_DIR_SUCCESS = "ADD_DIR_SUCCESS";
export const ADD_DIR_FAILURE = "ADD_DIR_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_DIR_REQUEST:
        draft.loadMyDirLoading = true;
        draft.loadMyDirDone = false;
        draft.loadMyDirError = null;
        break;
      case LOAD_MY_DIR_SUCCESS:
        draft.loadMyDirLoading = false;
        draft.loadMyDirDone = true;
        draft.allDirs = action.data;
        break;
      case LOAD_MY_DIR_FAILURE:
        draft.loadMyDirLoading = false;
        draft.loadMyDirError = action.error;
        draft.allDirs = null;
      case ADD_DIR_REQUEST:
        draft.addDirLoading = true;
        draft.addDirDone = false;
        draft.addDirError = null;
        break;
      case ADD_DIR_SUCCESS:
        draft.addDirLoading = false;
        draft.addDirDone = true;
        draft.allDirs.unshift(action.data);
        break;
      case ADD_DIR_FAILURE:
        draft.addDirLoading = false;
        draft.addDirError = action.error;
        draft.allDirs = null;
        break;
      default:
        break;
    }
  });
};

export default reducer;
