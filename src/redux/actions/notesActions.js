// import { type } from "@testing-library/user-event/dist/type";
export const Add_Note =  "Add_Notes";
export const Set_Notes = "Set_Notes";
export const Add_Label = "Add_Label";
export const Remove_Label = "Remove_Label";

export const addNote = (note) =>({
    type: Add_Note,
    payload: note,
})

export const setNotes = (notes) =>({
    type: Set_Notes,
    payload: notes,
})

export const addLabel = (label) => ({
    type : Add_Label,
    payload: label,
})

export const removeLabel = (label) => ({
    type: removeLabel,
    payload: label,
})
