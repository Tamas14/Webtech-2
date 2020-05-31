import React, { Component } from 'react'
import ReactTable from 'react-table'
import bookAction from '../../actions/bookActions'

import styled from 'styled-components'

import '../../style/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateBook extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/books/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteBook extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the book ${this.props.name} permanently?`,
            )
        ) {
            bookAction.deleteBookById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await bookAction.getAllBooks().then(book => {
            this.setState({
                books: book.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { books, isLoading } = this.state

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Authors',
                accessor: 'authors',
                filterable: true,
                Cell: props => <span>{props.value.join(', ')}</span>,
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteBook id={props.original._id} name={props.original.name} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateBook id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!books.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={books}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default BookList