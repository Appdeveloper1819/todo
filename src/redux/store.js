import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    window._Redux_DEVTOOLS_EXTENSION_ && window._Redux_DEVTOOLS_EXTENSION__()
);

export default store;
