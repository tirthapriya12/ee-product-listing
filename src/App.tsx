import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import { CartContextProvider } from "./context/CartContext";
import ProductListing from "./pages/ProductListing";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <CartContextProvider>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DefaultLayout>
      </CartContextProvider>
    </Router>
  );
}

export default App;
