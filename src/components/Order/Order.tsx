import React, { useEffect, useState } from "react";
import "./index.css";

export interface OrderProps {
    [x: string]: any;
    url: string;
    title: string;
    category: string;
    price: number;
}

export const Order: React.FC<OrderProps> = ({ url, title, category, price }) => {
    const [inCart, setInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const item = cart.find((item: OrderProps) => item.title === title);

        if (item) {
            setInCart(true);
            setQuantity(item.quantity);
        }
    }, [title]);

    const updateCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (inCart) {
            cart = cart.filter((item: OrderProps) => item.title !== title);
            setInCart(false);
        } else {
            cart.push({ url, title, category, price, quantity });
            setInCart(true);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const changeQuantity = (amount: number) => {
        const newQuantity = Math.max(1, quantity + amount);
        setQuantity(newQuantity);
    };

    return (
        <div className="card">
            <div className="image-container">
                <img className="image" src={url} alt={title} />
            </div>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-category">{category}</p>
                <p className="card-price">${price}</p>
            </div>

            <div className="quantity-controls">
                <button className="btn-decrease" onClick={() => changeQuantity(-1)}>-</button>
                <span className="quantity">{quantity}</span>
                <button className="btn-increase" onClick={() => changeQuantity(1)}>+</button>
            </div>

            <button className={`btn ${inCart ? "btn-remove" : "btn-add"}`} onClick={updateCart}>
                {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
        </div>
    );
};
