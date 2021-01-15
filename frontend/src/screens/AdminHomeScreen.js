import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminHomeScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // Redirect user to /login if they are not an admin
    if (userInfo && userInfo.isAdmin === 'true') {
      console.log('Welcome, admin')
    } else {
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [dispatch, history])

  return <></>
}

export default AdminHomeScreen
