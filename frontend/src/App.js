import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { ErrorBoundary } from 'react-error-boundary'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductScreen from './screens/ProductScreen'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import AdminUserListScreen from './screens/AdminUserListScreen'
import AdminHomeScreen from './screens/AdminHomeScreen'
import AdminUserEditScreen from './screens/AdminUserEditScreen'
import AdminProductsScreen from './screens/AdminProductsScreen'
import AdminProductEditScreen from './screens/AdminProductEditScreen'
import AdminOrdersScreen from './screens/AdminOrdersScreen'

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/admin' component={AdminHomeScreen} />
            <Route path='/admin/userlist' component={AdminUserListScreen} />
            <Route path='/admin/user/:id/edit' component={AdminUserEditScreen} />
            <Route path='/admin/productlist' component={AdminProductsScreen} exact />
            <Route path='/admin/productlist/:pageNumber' component={AdminProductsScreen} exact />
            <Route path='/admin/product/:id/edit' component={AdminProductEditScreen} />
            <Route path='/admin/orderlist' component={AdminOrdersScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keywork/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </ErrorBoundary>
  )
}

function ErrorFallback({ error, resetErrorBoundary }) {
  const styling = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  return (
    <div role='alert' as='errorpage' style={styling}>
      <h2 style={{ marginBottom: '10vh' }}>Oh no! Looks like something went wrong:</h2>
      {'\n'}
      <pre>{error.message}</pre>
      {'\n'}
      <Button onClick={resetErrorBoundary} variant='info'>
        Go Back
      </Button>
    </div>
  )
}

export default App
