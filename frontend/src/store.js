import { productdetailreducer, productreducer } from './Reducer/productreducer';
import { configureStore } from '@reduxjs/toolkit';
const reducer=({
    products:productreducer,
    productdetail:productdetailreducer,
});
const store = configureStore({reducer})
export default store;