import React from 'react'
import request from 'superagent'

import People from './People'

URL = "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"

class App extends React.Component {
  state = {
    movie: {}
  }

  componentDidMount = () => {
    this.loadStart()
  }

  loadStart = () => {
    request.get(URL)
      .then(res => {
        this.setState({
          movie: res.body
        })
      })
  }

  render() {
    return (
      <section>

        <h1>{this.state.movie.title ? <p>{this.state.movie.title}</p> : <p>Movie</p>}</h1>

        <article>
          <p>Director: {this.state.movie.director}</p>
          <p>Released: {this.state.movie.release_date}</p>
          <p>{this.state.movie.description}</p>

          <People data={this.state.movie}/>
        </article>

      </section>
    )
  }
}

export default App
