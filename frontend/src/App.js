import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
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
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/admin' component={AdminHomeScreen} />
          <Route path='/admin/userlist' component={AdminUserListScreen} />
          <Route path='/admin/user/:id/edit' component={AdminUserEditScreen} />
          <Route path='/admin/productlist' component={AdminProductsScreen} />
          <Route path='/admin/product/:id/edit' component={AdminProductEditScreen} />
          <Route path='/admin/orderlist' component={AdminOrdersScreen} />
          {/* <Route path='/admin/order/:id/edit' component={AdminOrderEditScreen} /> */}
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
