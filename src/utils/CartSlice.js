import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.card.info.id === item.card.info.id);

            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity if item exists
            } else {
                state.items.push({ ...item, quantity: 1 }); // Add new item with quantity 1
            }
        },
        removeItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.card.info.id === item.card.info.id);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1; // Decrease quantity
                } else {
                    state.items = state.items.filter((i) => i.card.info.id !== item.card.info.id); // Remove item if quantity is 0
                }
            }
        },
        clearCart: (state) => {
            state.items = []; // Clears cart
            state.total = 0;
        },
        totalPrice: (state) => {
            state.total = state.items.reduce((acc, item) => {
                return acc + (item.quantity * (item.card.info.price / 100 || item.card.info.defaultPrice / 100));
            }, 0);
        },
    },
});

export const { addItem, removeItem, clearCart, totalPrice } = cartSlice.actions;
export default cartSlice.reducer;
