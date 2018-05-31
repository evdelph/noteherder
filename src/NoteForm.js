import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: this.blankNote(),
    }
  }

  componentWillReceiveProps = (newProps) => {
    const newId = newProps.match.params.id
    const i = newProps.notes.findIndex(currentNote => currentNote.id.toString() === newId)
    const note = newProps.notes[i] || this.blankNote()

    if (note) {
      this.setState({ note })
    }
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
      time: null
    }
  }

  handleChanges = (ev) => {
    const note = {...this.state.note}
    note[ev.target.name] = ev.target.value
    this.setState(
      { note },
      () => this.props.saveNote(note),
      note.time=new Date(Date.now())
    )
    console.log(note.time=new Date(Date.now()))
  }
  
  render() {
    const { removeNote } = this.props
    return (
      <div className="NoteForm">
        <div className="form-actions">
          <button
            type="button"
            onClick={() => removeNote(this.state.note)}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
        <form>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title your note"
              value={this.state.note.title}
              onChange={this.handleChanges}
            />
          </p>

          <textarea
            name="body"
            value={this.state.note.body}
            onChange={this.handleChanges}
          ></textarea>
        </form>
      </div>
    )
  }
}

export default NoteForm