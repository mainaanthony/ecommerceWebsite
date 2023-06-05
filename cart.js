import { updateCart, updateCartCounter } from './index'


updateCartCounter


const local = localStorage.getItem("cart_items")



const cart_items = local? JSON.parse(local) : [];


cart_items?.map(item=>console.log(`Title: ${item.title}
                                       Quantity: ${item.quantity}`))