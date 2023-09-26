import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,    
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_DETAIL_REQUEST,
    ALL_PRODUCT_DETAIL_SUCCESS,    
    ALL_PRODUCT_DETAIL_FAIL,
    ALL_CLEAR_ERROR
} from '../Constants/productconstant.js';


export const productreducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productcounts,
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ALL_CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
export const productdetailreducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                product: [],
            };
        case ALL_PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                productCount: action.payload.productcounts,
            };
        case ALL_PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ALL_CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};