import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='mt-3 p-3 rounded h-100'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='mb-auto "img-fluid"' />
      </Link>
      <Card.Body className='mb-n5'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='h5'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3' className='mb-auto'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
