// import { type } from "@testing-library/user-event/dist/type";
export const Add_Note =  "Add_Notes";
export const Delete_Notes = "Delete_Notes";


export const addNote = (note) =>({
    type: Add_Note,
    payload: note,
})

export const deleteNotes = (id) =>({
    type: Delete_Notes,
    payload: id,
})

// export const addLabel = (label) => ({
//     type : Add_Label,
//     payload: label,
// })

// export const removeLabel = (label) => ({
//     type: removeLabel,
//     payload: label,
// })
