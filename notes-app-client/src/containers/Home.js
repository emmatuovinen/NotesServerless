import React, { Component } from 'react';
import {PageHeader, ListGroup, ListGroupItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./Home.css";
import {API} from "aws-amplify";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            notes: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const notes = await this.notes();
            this.setState({notes});
        } catch (e) {
            alert(e);
        }

        this.setState({isLoading: false})
    }

    notes() {
        return API.get("myNotes", "/myNotes");
    }

    // notes list is always rendered with a Create new note button first even if the list is empty
    //
    renderNotesList(notes) {
        return [{}].concat(notes).map(
            (note, i) =>
                i !== 0
                ? <LinkContainer
                    key={note.noteId}
                    to={`/notes/${note.noteId}`}
                >
                    <ListGroupItem header={note.content.trim().split("\n")[0]}>
                        {"Created: " + new Date(note.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
                : <LinkContainer
                    key="new"
                    to="/notes/new"
                >
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Create a new note
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
        )
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>My Notes</h1>
                <p>A simple note taking app</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg" >
                    login
                    </Link>
                    <Link to="/signup" className="btn btn-info btn-lg">
                    sign up
                    </Link>
                </div>
            </div>
        )
    }

    renderNotes() {
        return (
            <div className="notes">
                <PageHeader>Your Notes</PageHeader>
                <ListGroup>
                    {!this.state.isLoading && this.renderNotesList(this.state.notes)}
                </ListGroup>
            </div>
        )
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}             
            </div>
        );
    }
}

export default Home;