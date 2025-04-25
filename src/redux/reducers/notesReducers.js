// import { toggleInputVisibility } from "../actions/notesActions";
import {
  DELETE_NOTES,
  REMOVE_LABEL,
  RESTORE_NOTES,
  ADD_NOTE,
  ADD_LABEL,
  UPDATE_IMAGE_UPLOAD,
  TOGGLE_INPUT_VISIBILITY,
  ADD_INPUT,    
} from "../types/noteTypes";

const initialState = {
  notes: [],
  deletedNotes: [],
  inputVisible: false,
  inputs: [''],
};

export default function notesReducer(State = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...State,
        notes: [...State.notes, action.payload],
      };

    case DELETE_NOTES:
      const noteToDelete = State.notes.find(
        (note) => note.id === action.payload
      );
      if (!noteToDelete) return State;
      return {
        ...State,
        notes: State.notes.filter((note) => note.id !== action.payload),
        deletedNotes: [...State.deletedNotes, noteToDelete],
      };

    case RESTORE_NOTES:
      const restored = State.deletenotes.find(
        (note) => note.id === action.payload
      );
      if (!restored) return State;
      return {
        ...State,
        notes: [...State.notes, restored],
        deletedNotes: State.deletedNotes.filter(
          (note) => note.id !== action.payload
        ),
      };

    case REMOVE_LABEL:
      return {
        ...State,
        notes: State.notes.map((note) => {
          if (note.label === action.payload) {
            return { ...note, label: null };
          }
          return note;
        }),
      };
    case ADD_LABEL:
      return {
        ...State,
        labels: State.notes.map((note) => {
          if (note.id === action.payload.noteId) {
            return { ...note, label: action.payload.label };
          }
          return note;
        }),
      };

      case UPDATE_IMAGE_UPLOAD:
        return {
          ...State,
          notes: State.notes.map(note =>
            note.id === action.payload.noteId
              ? { ...note, image: action.payload.image }
              : note
          ),
        };

        case TOGGLE_INPUT_VISIBILITY:
          return {
            ...State,
            inputVisible: !State.inputVisible,
          };

        case ADD_INPUT:
          return {
            ...State,
            inputs: [...State.inputs, '']
          };
    default:
      return State;
  }
};
