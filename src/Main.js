import React from 'react'
import { Route, Switch } from 'react-router-dom'

import base from './base'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [],
    }
  }

  componentWillMount() {
    base.syncState(`notes/${this.props.uid}`, {
      context: this,
      state: 'notes',
      asArray: true,
    })
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
      time: null,
    }
  }


  saveNote = (note) => {
    let shouldRedirect = false
    const notes = [...this.state.notes]

    if (!note.id) {
      note.id = Date.now()
      note.time = new Date(Date.now())
      notes.unshift(note)
      shouldRedirect = true
    } else {
      const i = notes.findIndex(currentNote => currentNote.id === note.id)
      notes[i] = note
      notes.splice(i,1)
      notes.unshift(note)
    }

    console.log(new Date(Date.now()))

    this.setState(
      { notes }
    )

    if (shouldRedirect) {
      this.props.history.push(`/notes/${note.id}`)
    }
}

  removeNote = (currentNote) => {
    const notes = [...this.state.notes]

    const i = notes.findIndex(note => note.id === currentNote.id)
    if (i > -1) {
      notes.splice(i, 1)
      this.setState({ notes })
      this.props.history.push('/notes')
    }
  }

  render() {
    const formProps = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      notes: this.state.notes,
    }

    return (
      <div className="Main" style={style}>
        <Sidebar signOut={this.props.signOut} />
        <NoteList notes={this.state.notes}/>
        

        <Switch>
          <Route
            path="/notes/:id"
            render={navProps => (
              <NoteForm
                {...formProps}
                {...navProps}
              />
            )}
          />
          <Route
            render={navProps => (
              <NoteForm
                {...formProps}
                {...navProps}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

const style = {
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}

export default Main