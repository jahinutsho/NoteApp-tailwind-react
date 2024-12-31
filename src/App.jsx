import { useState } from "react";

const App = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  const changeTitleHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (noteTitle.trim() === "") {
      return alert("Please provide a valid title.");
    }
    editMode ? updateHandler() : createHandler();
  };

  const createHandler = () => {
    const newNote = {
      id: Date.now() + "",
      title: noteTitle,
      content: "", // Placeholder for content
    };
    setNotes([newNote, ...notes]);
    setNoteTitle("");
  };

  const removeHandler = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const editHandler = (note) => {
    setEditMode(true);
    setEditableNote(note);
    setNoteTitle(note.title);
  };

  const updateHandler = () => {
    const updatedNotes = notes.map((item) =>
      item.id === editableNote.id ? { ...item, title: noteTitle } : item
    );
    setNotes(updatedNotes);
    setEditMode(false);
    setEditableNote(null);
    setNoteTitle("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="w-full max-w-lg px-6 py-8 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Notes Manager
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            value={noteTitle}
            onChange={changeTitleHandler}
            placeholder="Enter note title"
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-md focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            {editMode ? "Update Note" : "Add Note"}
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-2xl text-white font-semibold mb-4">All Notes</h2>
          <ul className="space-y-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="flex justify-between items-center px-4 py-3 rounded-lg bg-white/30 backdrop-blur-md shadow-md"
              >
                <span className="text-lg text-gray-800">{note.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editHandler(note)}
                    className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeHandler(note.id)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
