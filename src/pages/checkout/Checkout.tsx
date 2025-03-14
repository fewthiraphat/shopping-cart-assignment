import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

export const Checkout = () => {
    const [cart, setCart] = useState<{
        category: any; title: string; quantity: number; price: number 
}[]>([]);
    const [coupons, setCoupons] = useState<any[]>([]);
    const [selectedCoupons, setSelectedCoupons] = useState<any[]>([]);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(cartData);

        axios
            .get("http://localhost:3000/coupons")
            .then((response) => setCoupons(response.data))
            .catch((error) => console.error("Error fetching coupons:", error));
    }, []);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const applyDiscount = (coupon: any) => {
        let newDiscount = 0;
        const subtotal = calculateSubtotal();

        switch (coupon.discount_rules.type) {
            case "fixed_amount":
                newDiscount = coupon.discount_rules.parameters.amount;
                break;
            case "percentage":
                newDiscount = (subtotal * coupon.discount_rules.parameters.percentage) / 100;
                break;
            case "category_percentage":
                const categoryItemsTotal = cart
                    .filter(item => item.category === coupon.discount_rules.parameters.category) // Match category
                    .reduce((total, item) => total + item.price * item.quantity, 0);
                    newDiscount = (categoryItemsTotal * coupon.discount_rules.parameters.percentage) / 100;
                break;
            case "points":
                const maxDiscount = (subtotal * 20) / 100;
                newDiscount = Math.min(maxDiscount, coupon.discount_rules.parameters.customer_points);
                break;
            case "threshold_discount":
                newDiscount =
                    Math.floor(subtotal / coupon.discount_rules.parameters.every_x_thb) *
                    coupon.discount_rules.parameters.discount_y_thb;
                break;
            default:
                break;
        }

        return newDiscount;
    };

    const handleCouponSelection = (coupon: any) => {
        let updatedSelectedCoupons = [...selectedCoupons];

        const existingIndex = updatedSelectedCoupons.findIndex((c) => c.campaign === coupon.campaign);

        if (existingIndex !== -1) {
            updatedSelectedCoupons.splice(existingIndex, 1);
        } else {
            updatedSelectedCoupons = updatedSelectedCoupons.filter((c) => c.category !== coupon.category);

            updatedSelectedCoupons.push(coupon);
        }

        setSelectedCoupons(updatedSelectedCoupons);

        let totalDiscount = 0;
        const couponOrder = ["Coupon", "On Top", "Seasonal"];

        for (const category of couponOrder) {
            const applicableCoupons = updatedSelectedCoupons.filter((c) => c.category === category);
            applicableCoupons.forEach((applicableCoupon) => {
                totalDiscount += applyDiscount(applicableCoupon);
            });
        }

        setDiscount(totalDiscount);
    };

    const calculateTotal = () => {
        return calculateSubtotal() - discount;
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-summary">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <p><strong>{item.title}</strong></p>
                                <p>Qty: {item.quantity}</p>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="coupon-section">
                        <h2>Apply Coupon</h2>
                        <div className="coupon-buttons">
                            {coupons.map((coupon, index) => (
                                <button
                                    key={index}
                                    className={`coupon-btn ${selectedCoupons.includes(coupon) ? "selected" : ""}`}
                                    onClick={() => handleCouponSelection(coupon)}
                                >
                                    Name: {coupon.campaign} <br/>
                                    Type: {coupon.category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="selected-coupons">
                    <h3>Selected Coupons:</h3>
                    {selectedCoupons.length === 0 ? (
                        <p>No coupons selected.</p>
                    ) : (
                        selectedCoupons.map((coupon, index) => (
                            <p key={index}>
                                {coupon.campaign}: -${applyDiscount(coupon).toFixed(2)}
                            </p>
                        ))
                    )}
                </div>


                    <div className="order-summary">
                        <p>Subtotal: <strong>${calculateSubtotal().toFixed(2)}</strong></p>
                        <p>Discount: <strong>-${discount.toFixed(2)}</strong></p>
                        <p className="total">Total: <strong>${calculateTotal().toFixed(2)}</strong></p>
                    </div>

                    <button className="checkout-btn">Proceed to Payment</button>
                </div>
            )}
        </div>
    );
};
