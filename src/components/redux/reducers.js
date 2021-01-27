const state = {
  displayName: "",
  photoURL: "",
  email: "",
  photoLiterals: "",
};

const followers = [];

export const accountReducer = (reducer_state = state, action) => {
  switch (action.type) {
    case "SIGNIN":
      reducer_state.displayName = action.payload.displayName;
      reducer_state.photoURL = action.payload.photoURL;
      reducer_state.email = action.payload.email;
      reducer_state.photoLiterals = action.payload.photoLiterals;
      localStorage.setItem("user", JSON.stringify(reducer_state));
      return reducer_state;

    case "SIGNOUT":
      reducer_state = {};

      return reducer_state;
    default:
      return reducer_state;
  }
};

export const followerReducer = (reducer_state = followers, action) => {
  switch (action.type) {
    case "FOLLOWERLIST":
      reducer_state = action.payload.followerList;
      return reducer_state;
    case "SIGNOUT":
      reducer_state = [];
      return reducer_state;

    default:
      return reducer_state;
  }
};
