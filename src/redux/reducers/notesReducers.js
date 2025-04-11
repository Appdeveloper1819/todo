import { Add_Note, Delete_Notes } from "../actions/notesActions";
// import { Set_Notes, Add_Label, Remove_Label } from "../actions/notesActions";

const initialState = {
  notes: [],
  labels: [],
};

const notesReducer = (State = initialState, action) => {
  switch (action.type) {  
      case Add_Note:
        return {
          ...State,
          notes: [...State.notes, action.payload],
        };
    case Delete_Notes:
      return {
        ...State,
        notes: State.notes.filter((note) => note.id !== action.payload),
      };
  //   case Remove_Label:
  //     return {
  //       ...State,
  //       labels: State.labels.filter((label) => label !== action.payload),
  //     };
    default:
      return State;
  }
};

export default notesReducer;
