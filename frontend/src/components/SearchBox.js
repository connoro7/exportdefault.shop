import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      // TODO - CD - 1/29/21 - Create route for search
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
        placeholder='Search'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Go
      </Button>
    </Form>
  )
}
