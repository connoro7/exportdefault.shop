import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAYMENT_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const orderId = match.params.id
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userInfo = useSelector((state) => state.userLogin.userInfo)
  const { email } = userInfo

  const orderPayment = useSelector((state) => state.orderPayment)
  // renaming loading and success because it's already been called
  const { loading: loadingPay, success: successPay } = orderPayment

  if (!loading) {
    // Calculate prices:
    // Forces decimal value of price to display to hundredths
    const fixPriceDecimals = (number) => {
      return (Math.round(number * 100) / 100).toFixed(2)
    }

    // subtotal = sum of all items
    order.subtotal = fixPriceDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    // If order doesn't exist or has already been paid for, then dispatch orderId
    if (!order || successPay) {
      dispatch({ type: ORDER_PAYMENT_RESET })
      dispatch(getOrderDetails(orderId))
    }
    // If order hasn't been paid for, check to see if paypal script has been loaded. If not, then load paypal script.
    else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      }
    } else {
      setSdkReady(true)
    }
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order #{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>An order confirmation email has been sent to: </strong>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p>
                <strong>Ship to:</strong>
              </p>
              <p>
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.addressOne}, {order.shippingAddress.addressTwo}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.stateOrProvince} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <></>}
              {/* <Message variant='warning'>Not yet delivered</Message> */}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Pending payment...</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Details</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                  <Col>${order.subtotal}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
