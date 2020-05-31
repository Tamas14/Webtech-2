import React, {Component} from 'react'
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

class BookCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            authors: '',
            date: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({name})
    }

    handleChangeInputRating = async event => {
        const authors = event.target.validity.valid
            ? event.target.value
            : this.state.authors

        this.setState({authors})
    }

    handleChangeInputDate = async event => {
        const date = event.target.value

        if (date < 0)
            return

        this.setState({date})
    }

    handleIncludeBook = async () => {
        const {name, authors, date} = this.state
        let arrayAuthors = authors.split(',')
        arrayAuthors = arrayAuthors.map(Function.prototype.call, String.prototype.trim);
        const payload = {name, authors: arrayAuthors, date}

        await bookAction.insertBook(payload).then(res => {
            window.alert(`Book inserted successfully`)
            this.setState({
                name: '',
                authors: '',
                date: '',
            })
        })
    }

    render() {
        const {name, authors, date} = this.state
        return (
            <Wrapper>
                <Title>Create book</Title>

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
                    onChange={this.handleChangeInputRating}
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

                <Button onClick={this.handleIncludeBook}>Add Book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default BookCreate