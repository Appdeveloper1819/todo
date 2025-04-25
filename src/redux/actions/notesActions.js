import {
  ADD_NOTE,
  ADD_LABEL,
  DELETE_NOTES,
  REMOVE_LABEL,
  RESTORE_NOTES,
  CLEAR_SELECTION,
  UPDATE_IMAGE_UPLOAD,
  TOGGLE_INPUT_VISIBILITY,
  ADD_INPUT,
  UPDATE_INPUT,
} from "../types/noteTypes";

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

export const deleteNotes = (id) => ({
  type: DELETE_NOTES,
  payload: id,
});

export const restoreNotes = (id) => ({
  type: RESTORE_NOTES,
  payload: id,
});

export const clearSelection = () => ({
  type: CLEAR_SELECTION,
});

export const removeLabel = (label) => ({
  type: REMOVE_LABEL,
  payload: label,
});

export const addLabel = (label) => ({
  type: ADD_LABEL,
  payload: label,
});

export const updateImageUpload = (noteId, imageDataUrl) => ({
  type: UPDATE_IMAGE_UPLOAD,
  payload: { noteId, image: imageDataUrl },
});

export const toggleInputVisibility = () => ({
  type: TOGGLE_INPUT_VISIBILITY,
});

export const addInput = () => ({
  type: ADD_INPUT,
});

export const updateInput = (index, value) => ({
  type: UPDATE_INPUT,
  payload: { index, value },
});
