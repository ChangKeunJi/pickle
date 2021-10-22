import produce from "immer";

const initialState = {
  allDirs: [],
  loadDirLoading: false,
  loadDirDone: false,
  loadDirError: null,
  addDirLoading: false,
  addDirDone: false,
  addDirError: null,
  updateOrderLoading: false,
  updateOrderDone: false,
  updateOrderError: null,
  updateDirLoading: false,
  updateDirDone: false,
  updateDirError: null,
  deleteDirLoading: false,
  deleteDirDone: false,
  deleteDirError: null,
};

export const LOAD_DIR_REQUEST = "LOAD_DIR_REQUEST";
export const LOAD_DIR_SUCCESS = "LOAD_DIR_SUCCESS";
export const LOAD_DIR_FAILURE = "LOAD_DIR_FAILURE";

export const ADD_DIR_REQUEST = "ADD_DIR_REQUEST";
export const ADD_DIR_SUCCESS = "ADD_DIR_SUCCESS";
export const ADD_DIR_FAILURE = "ADD_DIR_FAILURE";

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_FAILURE = "UPDATE_ORDER_FAILURE";

export const UPDATE_DIR_REQUEST = "UPDATE_DIR_REQUEST";
export const UPDATE_DIR_SUCCESS = "UPDATE_DIR_SUCCESS";
export const UPDATE_DIR_FAILURE = "UPDATE_DIR_FAILURE";

export const DELETE_DIR_REQUEST = "DELETE_DIR_REQUEST";
export const DELETE_DIR_SUCCESS = "DELETE_DIR_SUCCESS";
export const DELETE_DIR_FAILURE = "DELETE_DIR_FAILURE";

const updateAllDir = (allDirs, dir) => {
  let arr = Array.from(allDirs);
  const updatedDir = arr.find((el) => el.id === dir.id);
  const index = arr.findIndex((el) => el === updatedDir);
  arr.splice(index, 1, dir);
  return arr;
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_DIR_REQUEST:
        draft.loadDirLoading = true;
        draft.loadDirDone = false;
        draft.loadDirError = null;
        break;
      case LOAD_DIR_SUCCESS:
        draft.loadDirLoading = false;
        draft.loadDirDone = true;
        draft.allDirs = action.data;
        break;
      case LOAD_DIR_FAILURE:
        draft.loadDirLoading = false;
        draft.loadDirError = action.error;
        draft.allDirs = null;
      case ADD_DIR_REQUEST:
        draft.addDirLoading = true;
        draft.addDirDone = false;
        draft.addDirError = null;
        break;
      case ADD_DIR_SUCCESS:
        draft.addDirLoading = false;
        draft.addDirDone = true;
        draft.allDirs.push(action.data);
        break;
      case ADD_DIR_FAILURE:
        draft.addDirLoading = false;
        draft.addDirError = action.error;
      case UPDATE_ORDER_REQUEST:
        draft.updateOrderLoading = true;
        draft.updateOrderDone = false;
        draft.updateOrderError = null;
        break;
      case UPDATE_ORDER_SUCCESS:
        draft.updateOrderLoading = false;
        draft.updateOrderDone = true;
        draft.allDirs = action.data;
        break;
      case UPDATE_ORDER_FAILURE:
        draft.updateOrderLoading = false;
        draft.updateOrderError = action.error;
      case UPDATE_DIR_REQUEST:
        draft.updateDirLoading = true;
        draft.updateDirDone = false;
        draft.updateDirError = null;
        break;
      case UPDATE_DIR_SUCCESS:
        draft.updateDirLoading = false;
        draft.updateDirDone = true;
        draft.allDirs = updateAllDir(draft.allDirs, action.data);
        break;
      case UPDATE_DIR_FAILURE:
        draft.updateDirLoading = false;
        draft.updateDirError = action.error;
        break;
      case DELETE_DIR_REQUEST:
        draft.deleteDirLoading = true;
        draft.deleteDirDone = false;
        draft.deleteDirError = null;
        break;
      case DELETE_DIR_SUCCESS:
        draft.deleteDirLoading = false;
        draft.deleteDirDone = true;
        draft.allDirs = draft.allDirs.filter((el) => el.id !== action.data);
        break;
      case DELETE_DIR_FAILURE:
        draft.deleteDirLoading = false;
        draft.deleteDirError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
