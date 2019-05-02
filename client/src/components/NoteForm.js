import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { URL_NOTES } from './../constants'

class NoteForm extends Component {

  constructor() {
    super()

    this.state = {
      title: '',
      message: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, message } = this.state
    const data = {
      id: new Date(),
      title,
      content: message,
      editing: false
    }
    
    this.props.addNote(data)
    
    this.setState({ 
      title: '',
      message: ''
     })
  }

  onChange (name, value) {
    this.setState({ [name]: value })
  }

  render () {
    return (
      <div className="note-container">
        <h1 className="note_heading">Create Note</h1>
        <form className="form" onSubmit={this.handleSubmit} >
          <input 
            required 
            type="text"
            placeholder="Enter Note Title"
            onChange={(e)=> this.onChange('title', e.target.value)}
          />
          <br /><br />
          <textarea 
            required 
            rows="5"
            cols="28" 
            placeholder="Enter Note" 
            onChange={(e) => this.onChange('message', e.target.value)}
            />
            <br /><br />
          <button>Create</button>
        </form>
      </div>
    );
  }
}

const addNote = (data) => {
  return dispatch => {
    return fetch(URL_NOTES, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response=>{

      return dispatch({
        type: 'ADD_NOTE',
        data
      })
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addNote }, dispatch)  
}

export default connect(null, mapDispatchToProps)(NoteForm);