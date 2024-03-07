import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartPage from "./components/cartPage";
import Login from "./components/Login";
function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/products" element={<ProductCard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    
    </BrowserRouter>
  );
}

export default App;



