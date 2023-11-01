import { createSlice } from "@reduxjs/toolkit";
import { getAll } from "../services/productService";

const initialState = {
    items: [],
    amount: 0,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(x => x.id !== itemId);
            state.amount -= 1;
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;

            state.items.forEach(x => {
                total += x.amount * x.price;
                amount += x.amount;
            })

            state.amount = amount;
            state.total = total;
        },
        increaseAmount: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(x => x.id === itemId);
            item.amount += 1;
            state.amount += 1;

        },
        decreaseAmount: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(x => x.id === itemId);

            if (item.amount == 1) {
                state.items = state.items.filter(x => x.id !== itemId);
            }

            item.amount -= 1;
            state.amount -= 1;
        }
    },
    extraReducers: {
        [getAll.pending]: (state) => {
            state.items = [];
        },

        [getAll.fulfilled]: (state, action) => {
            state.items = action.payload.products;
            state.amount = action.payload.total;
            state.isLoading = false;
        }
    }
})

export const { removeItem, calculateTotal, increaseAmount, decreaseAmount } = cartSlice.actions;


export default cartSlice.reducer;