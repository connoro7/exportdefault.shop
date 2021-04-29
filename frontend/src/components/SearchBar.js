import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'

export const SearchBar = ({ history }) => {
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
    <Form onSubmit={submitHandler} inline className='mt-2'>
      <Form.Row>
        <Col>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
            placeholder='Search'
            className='mr-2'
          ></Form.Control>
        </Col>
        <Col>
          <Button type='submit' variant='outline-success' className='p-2'>
            Go
          </Button>
        </Col>
      </Form.Row>
    </Form>
  )
}
