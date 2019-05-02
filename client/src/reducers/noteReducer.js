const addNote = (state, action ) => {
  return [...state, action.data]
}

const getAllNote = (state, action) => {
  return action.payload
}

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD':
      return getAllNote(state, action)

    case 'ADD_NOTE':
      return addNote(state, action)

    case 'DELETE_NOTE':
      return state.filter((note) => note._id !== action.id)

    case 'EDIT_NOTE':
      return state.map((note) => note._id === action.id ? { ...note, editing: !note.editing } : note)
    
      case 'UPDATE':
      return state.map((note) => {
        if (note._id === action.id) {
          return {
            ...note,
            title: action.data.title,
            content: action.data.content,
            editing: !note.editing
          }
        } else return note;
      })
      
    default:
      return state;
  }
}
export default noteReducer;