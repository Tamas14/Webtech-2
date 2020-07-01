import React, { Component } from 'react'
import bookAction from '../../actions/bookActions'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class BookUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            authors: '',
            date: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputAuthors = async event => {
        const authors = event.target.validity.valid
            ? event.target.value
            : this.state.authors

        this.setState({ authors })
    }

    handleChangeInputDate = async event => {
        const date = Number(event.target.value)

        if(Number(event.target.max) >= date && date >= 0)
            this.setState({ date })
    }

    handleUpdateBook = async () => {
        const { id, name, authors, date } = this.state

        let arrayAuthors = authors.split(',')
        arrayAuthors = arrayAuthors.map(Function.prototype.call, String.prototype.trim)

        const payload = {name, authors: arrayAuthors, date}

        await bookAction.updateBookById(id, payload).then(res => {
            window.alert(`Book updated successfully`)
            this.setState({
                name: '',
                authors: '',
                date: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const book = await bookAction.getBookById(id)

        this.setState({
            name: book.data.data.name,
            authors: book.data.data.authors.join(","),
            date: book.data.data.date,
        })
    }

    render() {
        const { name, authors, date } = this.state
        return (
            <Wrapper>
                <Title>Update book</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Authors: </Label>
                <InputText
                    type="text"
                    placeholder="Author1, Author2"
                    value={authors}
                    onChange={this.handleChangeInputAuthors}
                />

                <Label>Date: </Label>
                <InputText
                    type="number"
                    step="1"
                    min="0"
                    placeholder="2020"
                    max={new Date().getFullYear()}
                    value={date}
                    onChange={this.handleChangeInputDate}
                />

                <Button onClick={this.handleUpdateBook}>Update Book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default BookUpdate