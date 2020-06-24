import React from 'react'
import request from 'superagent'


class People extends React.Component {
    state = {
        people: [],
        moreButton: false
    }

    componentDidUpdate(prevProps) {
        if (this.props.data.people != prevProps.data.people) {
            this.mapPeople()
        }
    }

    mapPeople = () => {
        this.props.data.people.map(this.loadPeople)
    }

    loadPeople = (link) => {
        request.get(link)
            .then(res => {
                this.setState({
                    people: [...this.state.people, res.body]
                })
            })
    }

    handleClick = (e) => {
        e.preventDefault()
        if (this.state.moreButton == false) {
            this.setState({
                moreButton: true
            })
        } else if (this.state.moreButton == true) {
            this.setState({
                moreButton: false
            })
        }
    }

    render() {
        const people = this.state.people
        return (
            <section>
                <h3>Characters</h3>
                <button
                    onClick={this.handleClick}>More Detail</button>
                <ul>
                    {people.map(person => {
                        return <article key={person.id}>
                            <p>{person.name}</p>

                            {this.state.moreButton && <ul>
                                <li>Gender: {person.gender}</li>
                                <li>Age: {person.age}</li>
                                <li>Eye color: {person.eye_color}</li>
                                <li>Hair color: {person.hair_color}</li>
                            </ul>}
                        </article>
                    })}
                </ul>

            </section>
        )
    }
}

export default People