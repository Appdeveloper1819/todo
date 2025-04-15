import { combineReducers } from 'redux';
import notesReducer from './notesReducers';
import noteSelectorReducer from './noteSelector';


const rootReducer = combineReducers({
  notes: notesReducer,
  noteSelector: noteSelectorReducer,

   
});

export default rootReducer;