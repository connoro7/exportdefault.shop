import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAILED,
  ORDER_PAYMENT_RESET,
  ORDER_SHOW_USER_ORDERS_REQUEST,
  ORDER_SHOW_USER_ORDERS_SUCCESS,
  ORDER_SHOW_USER_ORDERS_FAILED,
  ORDER_SHOW_USER_ORDERS_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILED,
  ORDER_PACKING_REQUEST,
  ORDER_PACKING_SUCCESS,
  ORDER_PACKING_FAILED,
  ORDER_PACKING_RESET,
  ORDER_IN_TRANSIT_REQUEST,
  ORDER_IN_TRANSIT_SUCCESS,
  ORDER_IN_TRANSIT_FAILED,
  ORDER_IN_TRANSIT_RESET,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAILED,
  ORDER_DELIVERED_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }

    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return { loading: true }

    case ORDER_PAYMENT_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAYMENT_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAYMENT_RESET:
      return {}
    default:
      return state
  }
}

export const showUserOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_SHOW_USER_ORDERS_REQUEST:
      return { loading: true }

    case ORDER_SHOW_USER_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_SHOW_USER_ORDERS_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_SHOW_USER_ORDERS_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPackingReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PACKING_REQUEST:
      return { loading: true }
    case ORDER_PACKING_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PACKING_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PACKING_RESET:
      return {}
    default:
      return state
  }
}

export const orderInTransitReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_IN_TRANSIT_REQUEST:
      return { loading: true }
    case ORDER_IN_TRANSIT_SUCCESS:
      return { loading: false, success: true }
    case ORDER_IN_TRANSIT_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_IN_TRANSIT_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true }
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELIVERED_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVERED_RESET:
      return {}
    default:
      return state
  }
}
