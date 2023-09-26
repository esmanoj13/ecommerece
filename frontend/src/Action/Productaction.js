import axios from 'axios';
import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,    
    ALL_PRODUCTDETAIL_SUCCESS,
    ALL_PRODUCTDETAIL_REQUEST,
    ALL_PRODUCTDETAIL_FAIL,
    ALL_CLEAR_ERROR,
} from '../Constants/productconstant.js';

export const getproducts=()=>async(dispatch)=>{
try {
    dispatch({type:ALL_PRODUCT_REQUEST});
    // axios is used to connect the backend with frontend
    const {data}= await axios.get("/api/v1/products");
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data,
    });    
} catch (error) {
    dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error.response.data.message,
    });
}
};
export const getproductdetail=(id)=>async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCTDETAIL_REQUEST});
        // axios is used to connect the backend with frontend
        const {data}= await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type:ALL_PRODUCTDETAIL_SUCCESS,
            payload:data.product,
        });    
    } catch (error) {
        dispatch({
            type:ALL_PRODUCTDETAIL_FAIL,
            payload:error.response.data.message,
        });
    }
    };
export const clearerror=()=>async(dispatch)=>{
dispatch({type: ALL_CLEAR_ERROR});
};



    

