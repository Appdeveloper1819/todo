
// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import NotesList from "./NotesList"; 

// const NotesApp = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const [notes, setNotes] = useState([
//     { id: 1, title: "Shopping List", content: "Buy milk and eggs" },
//     { id: 2, title: "Meeting Notes", content: "Discuss roadmap" },
//     { id: 3, title: "Book Ideas", content: "Write about AI" },
//   ]);

//   const [filteredNotes, setFilteredNotes] = useState(notes);

//   useEffect(() => {
//     const query = searchValue.toLowerCase();
//     const filtered = notes.filter(
//       note =>
//         note.title.toLowerCase().includes(query) ||
//         note.content.toLowerCase().includes(query)
//     );
//     setFilteredNotes(filtered);
//   }, [searchValue, notes]);

//   return (
//     <>
//       <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
//       <NotesList notes={filteredNotes} />
//     </>
//   );
// };

// export default NotesApp;
