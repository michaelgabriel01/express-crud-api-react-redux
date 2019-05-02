import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Note from './Note';
import EditComponent from './EditComponent';
import { URL_NOTES } from './../constants'

class AllNote extends Component {

  componentDidMount() {
    this.props.getAllNote()
  }

  render () {
    return (
      <div>
        <h1 className="note_heading">All Notes</h1>
        {this.props.notes.map((note) => (
          <div key={note._id}>
            {note.editing 
            ? (<EditComponent note={note} />)
            : (<Note note={note} />)}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const getAllNote = () => {
  return dispatch => {
    return fetch(URL_NOTES, {
      method: 'get',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200 ) {
        return response.json()
      }
    })
    .then(data=> {
      return dispatch({
        type: 'LOAD',
        payload: data
      })
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllNote }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNote);