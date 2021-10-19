import produce from "immer";

const initialState = {
  post: "",
};

// 오타 방지와 재사용을 위한 Variables

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "POST":
        draft.post = "post";
        break;
      default:
        break;
    }
  });
};

export default reducer;
