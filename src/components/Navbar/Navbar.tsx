import { Link } from "react-router-dom";
import "./index.css";
import Cart from "../../assets/cart.png";

export const Navbar = () => {
    return (
        <>
            <div className="navbar-container">
                <div className="navbar">
                    <div className="navbar-home">
                    <Link to="/">
                        <h1 className="home-text">Home</h1>
                    </Link>
                    </div>
                    <div>
                        <Link to="/checkout">
                            <img src={Cart} className="cart" alt="Cart" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
