import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder, packOrder, shipOrder, deliverOrder } from '../actions/orderActions'
// eslint-disable-next-line
import { ORDER_DELIVERED_RESET, ORDER_IN_TRANSIT_RESET, ORDER_PACKING_RESET, ORDER_PAYMENT_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const orderId = match.params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userInfo = useSelector((state) => state.userLogin.userInfo)
  const { email } = userInfo

  const orderPayment = useSelector((state) => state.orderPayment)
  const { loading: loadingPay, success: successPay } = orderPayment

  const orderPacking = useSelector((state) => state.orderPacking)
  // eslint-disable-next-line
  const { loading: loadingPacking, success: successPacking } = orderPacking

  const orderInTransit = useSelector((state) => state.orderInTransit)
  // eslint-disable-next-line
  const { loading: loadingInTransit, success: successInTransit } = orderInTransit

  const orderDelivered = useSelector((state) => state.orderDelivered)
  const { loading: loadingDelivered, success: successDelivered } = orderDelivered

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
    if (!userInfo) {
      history.push('/login')
    }
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

    // If order doesn't exist OR has already been paid for OR has been delivered, then dispatch orderId.
    if (!order || successPay || successDelivered) {
      dispatch({ type: ORDER_PAYMENT_RESET })
      // TODO - CD 1/27/21 // dispatch({ type: ORDER_PACKING_RESET })
      // TODO - CD 1/27/21 // dispatch({ type: ORDER_IN_TRANSIT_RESET })
      dispatch({ type: ORDER_DELIVERED_RESET })
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
  }, [dispatch, orderId, successPay, successDelivered, order])

  // eslint-disable-next-line
  const packingHandler = () => {
    dispatch(packOrder(order))
  }
  // eslint-disable-next-line
  const inTransitHandler = () => {
    dispatch(shipOrder(order))
  }

  const deliveredHandler = () => {
    dispatch(deliverOrder(order))
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  const viewAllMyOrdersHandler = () => {
    history.push('/profile')
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Button type='button' className='btn- btn-secondary' onClick={viewAllMyOrdersHandler}>
        <i className='fas fa-angle-left'></i> View My Orders
      </Button>
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
              {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='info'>Not yet shipped</Message>}
              {/*  */}
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

              {/* If user is admin, the order has been paid, and order is not yet delivered, then: */}
              {loadingPacking && <Loader />}
              {loadingInTransit && <Loader />}
              {loadingDelivered && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  {/* <Button type='button' className='btn btn-block' onClick={packingHandler}>
                    Mark As Being Packed
                  </Button>
                  <Button type='button' className='btn btn-block' onClick={inTransitHandler}>
                    Mark As In Transit
                  </Button> */}
                  <Button type='button' className='btn btn-block' onClick={deliveredHandler}>
                    Mark As Delivered
                  </Button>
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
