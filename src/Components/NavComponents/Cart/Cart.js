import { useDispatch, useSelector} from "react-redux";
import { useEffect,useState } from "react";
import ItemList from "../../ItemList/ItemList";
//import {cartItemList} from "../../ItemList/ItemList";
import './Cart.css';
import { clearCart,totalPrice } from "../../../utils/CartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart?.items || []);
    const total = useSelector((store) => store.cart?.total || 0);
    const dispatch=useDispatch();
    const [showCheckout, setShowCheckout] = useState(false);
    
    const GST = total * 0.18;
    const deliveryCharges = 40;
    const grandTotal = total + GST + deliveryCharges;
    
    const handleUPIPayment = () => {
        const upiID = "sonalirai098@okhdfcbank";  // Replace with your UPI ID
        const amount = grandTotal.toFixed(2);
        const url = `upi://pay?pa=${upiID}&pn=FoodApp&mc=&tid=&tr=&tn=Order%20Payment&am=${amount}&cu=INR`;
    
        window.location.href = url;
        
    };
    

    
    useEffect(() => {
        dispatch(totalPrice()); // Calculate total price whenever cart changes
    }, [cartItems, dispatch]);

    
    
    console.log("Cart Items from Redux:", cartItems);
    if (!cartItems || cartItems.length === 0) {
        return <h2>Your cart is empty</h2>;
    }
    return (
        
        <div className="cart" >
            <div className="cartI">
                <h1></h1>
                <button className="clear-btn" onClick={()=> dispatch(clearCart())}>Clear Cart </button>
            </div>
            <div>
                <h4>Subtotal ₹{total}</h4>
            </div>
             < ItemList Items={cartItems}></ItemList>
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>CheckOut</button>

            {showCheckout && (
                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <p>Subtotal: ₹{total.toFixed(2)}</p>
                    <p>GST (18%): ₹{GST.toFixed(2)}</p>
                    <p>Delivery Charges: ₹{deliveryCharges}</p>
                    <h3>To Pay: ₹{grandTotal.toFixed(2)}</h3>

                    <h4>Select Payment Method</h4>
                    <div className="payment-options">
                        <button className="pay-btn" onClick={handleUPIPayment}>Pay via UPI</button>
                        <button className="pay-btn">Credit/Debit Card</button>
                        <button className="pay-btn">Cash on Delivery</button>
                    </div>
                    
                    <button className="close-btn" onClick={() => setShowCheckout(false)}>Close</button>
                </div>
            )}
        </div>
    )
}
export default Cart;