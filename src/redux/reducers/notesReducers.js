import { Add_Note, Delete_Notes, Restore_Notes } from "../actions/notesActions";

const initialState = {
  notes: [],
  deletedNotes: [],
};

export default function notesReducer(State = initialState, action) {
  switch (action.type) {  
      case Add_Note:
        return {
          ...State,
          notes: [...State.notes, action.payload],
        };
      
          case  Delete_Notes:
            const noteToDelete = State.notes.find((note) => note.id === action.payload)
            if (!noteToDelete) return State;
            return {
              ...State,
              notes: State.notes.filter(note => note.id !== action.payload),
              deletedNotes: [...State.deletedNotes, noteToDelete],
            };
            
            case Restore_Notes:
              const restored = State.deletenotes.find((note) => note.id === action.payload)
              if (!restored) return State;
              return {
                ...State,
                notes: [...State.notes, restored],
                deletedNotes: State.deletedNotes.filter(note => note.id !== action.payload),
                };
    default:
      return State;
    }
};

