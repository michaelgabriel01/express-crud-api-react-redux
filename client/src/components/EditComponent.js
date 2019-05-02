import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { URL_NOTES } from './../constants'


class EditComponent extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const content = this.getMessage.value;
    const data = {
      title,
      content
    }
    this.props.updateNote({ id: this.props.note._id, data: data })
  }
  render () {
    return (
      <div key={this.props.note._id} className="note">
        <form className="form" onSubmit={this.handleEdit}>
          <input required type="text" ref={(input) => this.getTitle = input}
            defaultValue={this.props.note.title} placeholder="Enter Note Title" /><br /><br />
          <textarea required rows="5" ref={(input) => this.getMessage = input}
            defaultValue={this.props.note.content} cols="28" placeholder="Enter Note" /><br /><br />
          <button>Update</button>
        </form>
      </div>
    );
  }
}

const updateNote = (note) => {
  return dispatch => {
    return fetch(`${URL_NOTES}/${note.id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(note.data)
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
      .then(() => {
        dispatch({
          type: 'UPDATE', 
          id: note.id,
          data: {
            ...note.data,
            editing: true
          }
        })
      })
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateNote }, dispatch)
}

export default connect(null, mapDispatchToProps)(EditComponent);