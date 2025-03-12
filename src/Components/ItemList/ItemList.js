import { useDispatch,useSelector} from "react-redux";
import "./ItemList.css";
import { useState } from "react";
import { addItem,removeItem } from "../../utils/CartSlice.js";


const ItemList = ({ Items = [] }) => {


  
  const cartItems = useSelector((state) => state.cart.items); 
    const dispatch=useDispatch();


    const getItemQuantity = (id) => {
        const item = cartItems.find((i) => i.card.info.id === id);
        return item ? item.quantity : 0;
    };
  return (
    <div className="item-list">
        {Items.length > 0 ? (
            Items.map((item) => {
                const quantity = getItemQuantity(item.card.info.id);

                return (
                    <div className="item" key={item.card.info.id}>
                        <div className="item-details">
                            <div className="item-header">
                                <span className="item-name">{item.card.info.name}</span>
                                <span className="item-price">
                                    ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                                </span>
                            </div>
                            <p className="item-description">{item.card.info.description}</p>
                        </div>

                        <div className="item-right">
                            {item.card.info.imageId && (
                                <img
                                    className="item-img"
                                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_150,h_150/${item.card.info.imageId}`}
                                    alt={item.card.info.name}
                                />
                            )}

                            {quantity > 0 ? (
                                <div className="counter">
                                    <button
                                        className="DecInc dec"
                                        onClick={() => dispatch(removeItem(item))}
                                    >
                                        -
                                    </button>
                                    <span className="count">{quantity}</span>
                                    <button
                                        className="DecInc inc"
                                        onClick={() => dispatch(addItem(item))}
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="add-button"
                                    onClick={() => dispatch(addItem(item))}
                                >
                                    Add +
                                </button>
                            )}
                        </div>
                    </div>
                );
            })
        ) : (
            <h3>No items in the cart</h3>
        )}
    </div>
);
};

export default ItemList;
