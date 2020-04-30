import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { BooksList, BooksInsert, BooksUpdate, HomePage } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/Books/list" exact component={BooksList} />
                <Route path="/Books/create" exact component={BooksInsert} />
                <Route
                    path="/Books/update/:id"
                    exact
                    component={BooksUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App