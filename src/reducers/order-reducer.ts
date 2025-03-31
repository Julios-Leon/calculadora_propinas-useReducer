import { MenuItem, OrderItem } from "../types";

export type OrderActions = 
{type: "add-order", payload: {item: MenuItem}} |
{type: "delete-order", payload: {id: MenuItem["id"]}} |
{type: "add-tip", payload: {value: number}} |
{type: "place-order"}

export type State = {
    order: OrderItem[],
    tip: number
}

export const initialState : State = {
    order: [],
    tip: 0
}

export const orderReducer = (state: State = initialState, action: OrderActions) => {
    if(action.type === "add-order") {
        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)
        let updatedOrder : OrderItem[] = [];

        if(itemExist) {
            updatedOrder = state.order.map( orderItem => orderItem.id === action.payload.item.id ? 
                {...orderItem, quantity: orderItem.quantity + 1 } : 
                orderItem
            )
            return{...state, order: updatedOrder}
        } else {
            const newItem : OrderItem = {...action.payload.item, quantity: 1}
            updatedOrder = [...state.order, newItem]
        }
        
        return {...state, order: updatedOrder}
    }

    if(action.type === "delete-order") {
        const updatedOrder = state.order.filter((order) => order.id !== action.payload.id)
        return {...state, order: updatedOrder}
    }

    if(action.type === "add-tip") {
        return {...state, tip: action.payload.value}
    }

    if(action.type === "place-order") {
        return {...state, order: [], tip:0}
    }

    return state;
}
