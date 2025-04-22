// import { type } from "@testing-library/user-event/dist/type";

export const Add_Note =  "Add_Notes";
export const Delete_Notes = "Delete_Notes";
export const Clear_Selection = "Clear_Selection";
export const Restore_Notes = "Restore_Notes";
export const Remove_Label = "Remove_Label";
export const Add_Label = "Add_Label";   

export const addNote = (note) =>({
    type: Add_Note,
    payload: note,
})

export const deleteNotes = (id) =>({
    type: Delete_Notes,
    payload: id,
})

export const restoreNotes = (id) => ({
    type: Restore_Notes,
    payload: id,
})


export const clearSelection = () => ({
    type: Clear_Selection,
})

export const removeLabel = (label) => ({
    type: "Remove_Label",
    payload: label,
})

export const addLabel = (label) => ({
    type : Add_Label,
    payload: label,
})

// export const removeLabel = (label) => ({
//     type: removeLabel,
//     payload: label,
// })
