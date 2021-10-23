import produce from "immer";
import { updateArr } from "../hooks/helper";

const initialState = {
  allPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addRemoveFavPostLoading: false,
  addRemoveFavPostDone: false,
  addRemoveFavPostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_REMOVE_FAV_POST_REQUEST = "ADD_REMOVE_FAV_POST_REQUEST";
export const ADD_REMOVE_FAV_POST_SUCCESS = "ADD_REMOVE_FAV_POST_SUCCESS";
export const ADD_REMOVE_FAV_POST_FAILURE = "ADD_REMOVE_FAV_POST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.allPosts = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        draft.allDirs = null;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.allPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case ADD_REMOVE_FAV_POST_REQUEST:
        draft.addRemoveFavPostLoading = true;
        draft.addRemoveFavPostDone = false;
        draft.addRemoveFavPostError = null;
        break;
      case ADD_REMOVE_FAV_POST_SUCCESS:
        draft.addRemoveFavPostLoading = false;
        draft.addRemoveFavPostDone = true;
        draft.allPosts = updateArr(draft.allPosts, action.data);
        break;
      case ADD_REMOVE_FAV_POST_FAILURE:
        draft.addRemoveFavPostLoading = false;
        draft.addRemoveFavPostError = action.error;
        break;
      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.allPosts = draft.allPosts.filter((el) => el.id !== action.data);
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostError = action.error;
      default:
        break;
    }
  });
};

export default reducer;
