import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)

    // Calculate prices:
    // + subtotal = sum of all items
    // + shipping price
    // + tax price
    // = total price

    const placeOrderHandler = () => {
        console.log('place order handler')
    }
    
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city}{' '},
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}

                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.PaymentMethod}

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Details</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty.</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item,index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />

                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                </Col>

                                            </Row>

                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                            <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Subtotal</Col>
                                <Col>${cart.subtotal}</Col>
                            <Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            <Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            <Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            <Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
