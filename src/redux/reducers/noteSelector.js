import { Clear_Selection } from "../actions/notesActions";

const initialState ={
    selectedNotes: [],
}

const noteSelectorReducer = (state = initialState, action) => {
    switch (action.type) {
      case Clear_Selection:
        return {
          ...state,
          selectedNotes: [],
        };
      
      default:
        return state;
    }
  };
  
  export default noteSelectorReducer;
  