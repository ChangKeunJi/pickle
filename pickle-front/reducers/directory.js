import produce from "immer";

const initialState = {
  allDirs: [
    { id: 1, title: "Next" },
    { id: 2, title: "React" },
    { id: 3, title: "MySql" },
  ],
  dir: "",
};

// 오타 방지와 재사용을 위한 Variables

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "DIR":
        draft.dir = "dir";
        break;
      default:
        break;
    }
  });
};

export default reducer;
