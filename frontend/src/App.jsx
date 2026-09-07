import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './component/Nav';
import { userDataContext } from './context/UserContext';
import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import Ai from './component/Ai';

function App() {
  const { userData } = useContext(userDataContext);
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {!hideNav && <Nav />}

      <Routes>
        <Route
          path="/login"
          element={userData ? <Navigate to={location.state?.from || "/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={userData ? <Navigate to={location.state?.from || "/"} /> : <Registration />}
        />

        {/* Public Browsing Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />

        {/* Protected Shopping & Order Routes */}
        <Route
          path="/cart"
          element={userData ? <Cart /> : <Navigate to="/login" state={{ from: "/cart" }} />}
        />
        <Route
          path="/placeorder"
          element={userData ? <PlaceOrder /> : <Navigate to="/login" state={{ from: "/placeorder" }} />}
        />
        <Route
          path="/order"
          element={userData ? <Order /> : <Navigate to="/login" state={{ from: "/order" }} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Ai />
    </div>
  );
}

export default App;
