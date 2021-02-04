import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import Paginate from '../components/Paginate.js'
import Expire from '../components/Expire.js'
import { deleteProduct, listProducts, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const AdminProductsScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const productUpdate = useSelector((state) => state.productUpdate)
  // eslint-disable-next-line
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin === 'true') {
      history.push('/login')
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      // empty string as first argument because listProducts takes in keyword
      // want to display all products (since this is an admin panel), so must pass empty string
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, userInfo, successCreate, successDelete, createdProduct, pageNumber])

  const deleteHandler = (productId) => {
    if (window.confirm('Delete product?')) {
      dispatch(deleteProduct(productId))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      <Expire delay={5000}>{errorDelete && <Message variant='danger'>{errorDelete}</Message>}</Expire>
      {loadingCreate && <Loader />}
      <Expire delay={5000}>{errorCreate && <Message variant='danger'>{errorCreate}</Message>}</Expire>
      {loadingUpdate && <Loader />}
      <Expire delay={5000}>{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}</Expire>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <td>IMAGE</td>
                <th>PRICE</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <Image src={product.image} alt={product.name} width={75} />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn btn-sm' onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default AdminProductsScreen
