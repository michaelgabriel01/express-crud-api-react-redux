import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { URL_NOTES } from './../constants'


export class Note extends React.Component {
  render () {
    return (
      <div className="note">
        <h2 className="note_title">{this.props.note.title}</h2>
        <p className="note_message">{this.props.note.content}</p>
        <div className="control-buttons">
          <button 
            className="edit"
            onClick={() => this.props.updateNote(this.props.note._id)}
          >
          Edit
          </button>
          <button 
            className="delete"
            onClick={() => this.props.deleteNote(this.props.note._id)}
          >
          Delete
          </button>
        </div>
      </div>
    )
  }
}

const updateNote = (id) => {
  return dispatch=> {
    dispatch({ type: 'EDIT_NOTE', id })    
  }
}

const deleteNote = (id) => {
  return dispatch=> {
    return fetch(`${URL_NOTES}/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
      .then(() => {
        dispatch({ type: 'DELETE_NOTE', id })
      })
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateNote, deleteNote }, dispatch)
}


export default connect(null, mapDispatchToProps)(Note)