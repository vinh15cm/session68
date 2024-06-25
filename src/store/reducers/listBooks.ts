const libraryRecords = JSON.parse(localStorage.getItem("books") || "[]");

const reducerBooks = (state = libraryRecords, action: any) => {
  switch (action.type) {
    case "ADD":
      const newStateAdd = [...state, action.payload];
      localStorage.setItem("books", JSON.stringify(newStateAdd));
      return newStateAdd;
    case "DELETE":
      const newStateDelete = state.filter(
        (item: any) => item.id !== action.payload
      );
      localStorage.setItem("books", JSON.stringify(newStateDelete));
      return newStateDelete;
    case "EDIT":
      const updatedState = state.map((item: any) => {
        if (item.id === action.payload2) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
      localStorage.setItem("books", JSON.stringify(updatedState));
      return updatedState;
    case "CHANGE_STATUS":
      const changeStatusState = state.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            status: action.payload.status,
          };
        }
        return item;
      });
      localStorage.setItem("books", JSON.stringify(changeStatusState));
      return changeStatusState;
    case "True":
      return action.payload.filter(
        (item: any) => Boolean(item.status) === true
      );
    case "False":
      return action.payload.filter(
        (item: any) => Boolean(item.status) === false
      );
    case "All":
      return action.payload;
    default:
      return state;
  }
};

export default reducerBooks;
