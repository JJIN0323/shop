import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from '../_actions/types'
 
export default function userReducer(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
            // router/users.js 에서 가져온 auth 정보를 payload
        case LOGOUT_USER:
            return {...state }
        case ADD_TO_CART:
            return {...state, userData: { ...state.userData, cart: action.payload }}
            // router/users.js 에서 가져온 cart 정보를 payload
        case GET_CART_ITEMS:
            return {...state, cartDetail: action.payload }
            // user_actions.js 에서 가져온 response.data를 payload
        case REMOVE_CART_ITEM:
            return {...state, cartDetail: action.payload.productInfo,
                    userData: { ...state.userData, cart: action.payload.cart }}
        case ON_SUCCESS_BUY:
            return {...state, cartDetail: action.payload.cartDetail,
                    userData: {
                        ...state.userData, cart: action.payload.cart }}
            // route/users.js successBuy에서 return한 정보들
        default:
            return state
    }
}