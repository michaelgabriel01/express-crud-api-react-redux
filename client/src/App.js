import React, { Component } from 'react';

import './App.css';
import NoteForm from './components/NoteForm';
import AllNote from './components/AllNote'


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    
  } 

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h2 className="center ">Take notes</h2>
        </div>
        <NoteForm />
        <AllNote />
      </div>
    );
  }
}

export default App;
