import React from 'react'
import request from 'superagent'


class People extends React.Component {
    state = {
        people:[]
    }

    componentDidUpdate(prevProps){
        if (this.props.data.people != prevProps.data.people){
            this.mapPeople()
        }
    }

    mapPeople = () => {
        this.props.data.people.map(this.loadPeople)
    }

    loadPeople=(link)=>{
        request.get(link)
        .then(res => {
            this.setState({
                people: [...this.state.people, res.body]
            })
        })
    }

    render() {
        const people = this.state.people
        return (
            <section>
                <h3>Characters</h3>
                <ul>
                    {people.map(person => {
                        return <article key={person.id}>
                            <p>{person.name}</p>
                        </article>
                    })}
                </ul>
                
                {/* {this.props.data.people ? this.props.data.people.map((person, i) => {
                    return <article key={i}>
                        <p>{person}</p>
                    </article>
                }) : <p>Loading....</p>} */}

                {/* {(data.people && this.state.people.length < 1) && data.people.map(this.loadPeople)} */}
            </section>
        )
    }
}

export default People