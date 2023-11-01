import { createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://dummyjson.com/products?limit=100';

export const getAll = createAsyncThunk('cart/getAll', () => {
    return fetch(url)
        .then(res => res.json())
        .then(result => {
            const updatedProducts = result.products.map(x => ({ ...x, amount: 1 }));
            return { ...result, products: updatedProducts }
        })
        .catch(err => console.log(`Error: ${err}`))
})

