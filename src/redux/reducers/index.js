import { combineReducers } from 'redux';
import notesReducer from './notesReducers';

const rootReducer = combineReducers({
  notes: notesReducer,
});

export default rootReducer;