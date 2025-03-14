import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from "../src/components/Navbar/Navbar";
import { Shop } from './pages/shop/Shop';
import { Checkout } from './pages/checkout/Checkout';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
