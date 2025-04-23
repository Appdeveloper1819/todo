import { CLEAR_SELECTION } from "../types/noteTypes";

const initialState ={
    selectedNotes: [],
}

const noteSelectorReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLEAR_SELECTION:
        return {
          ...state,
          selectedNotes: [],
        };
      
      default:
        return state;
    }
  };
  
  export default noteSelectorReducer;
  