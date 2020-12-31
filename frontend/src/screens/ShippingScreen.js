import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [name, setName] = useState(shippingAddress.name)
  const [addressOne, setAddressOne] = useState(shippingAddress.addressOne)
  const [addressTwo, setAddressTwo] = useState(shippingAddress.addressTwo)
  const [city, setCity] = useState(shippingAddress.city)
  const [stateOrProvince, setStateOrProvince] = useState(shippingAddress.stateOrProvince)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ name, addressOne, addressTwo, city, stateOrProvince, postalCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Full name</Form.Label>
          <Form.Control required type='text' placeholder='First and last name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='addressOne'>
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control required type='text' placeholder='Street address, P.O. box, c/o.' value={addressOne} onChange={(e) => setAddressOne(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='addressTwo'>
          <Form.Label>Address Line 2</Form.Label>
          <small> (optional)</small>
          <Form.Control type='text' placeholder='Apartment, suite, unit, building, floor, etc.' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control required type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label>State or Province</Form.Label>
          <Form.Control required type='text' placeholder='State or province' value={stateOrProvince} onChange={(e) => setStateOrProvince(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Zip or Postal Code</Form.Label>
          <Form.Control required type='text' placeholder='Zip code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control required type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
