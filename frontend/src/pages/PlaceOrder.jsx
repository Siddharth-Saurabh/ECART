import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import razorpayLogo from '../assets/Razorpay.jpg';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { RiSecurePaymentLine, RiTruckLine, RiBankCardLine, RiCheckLine } from 'react-icons/ri';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_T0tkeA2VUAF1mS',
      amount: order.amount,
      currency: order.currency,
      name: 'eCart Luxury Wear',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${serverUrl}/api/order/verifyrazorpay`,
            response,
            { withCredentials: true }
          );
          if (data) {
            setCartItem({});
            toast.success("🎉 Payment verified! Order successfully placed.");
            navigate("/order");
          }
        } catch (err) {
          console.error(err);
          toast.error("Payment verification failed");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((p) => p._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty!");
        setLoading(false);
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      if (method === 'cod') {
        const result = await axios.post(
          `${serverUrl}/api/order/placeorder`,
          orderData,
          { withCredentials: true }
        );
        if (result.data) {
          setCartItem({});
          toast.success("Order Placed Successfully!");
          navigate("/order");
        } else {
          toast.error("Could not place order");
        }
      } else if (method === 'razorpay') {
        const resultRazorpay = await axios.post(
          `${serverUrl}/api/order/razorpay`,
          orderData,
          { withCredentials: true }
        );
        if (resultRazorpay.data) {
          initPay(resultRazorpay.data);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Order creation failed. Please check login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[88px] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="text-center mb-10">
        <Title text1="CHECKOUT" text2="& DELIVERY" />
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete your delivery details and choose your preferred payment method.
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Delivery Form Container */}
        <div className="lg:col-span-7 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider mb-2">
            <RiTruckLine className="text-lg" />
            <span>Shipping Address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First name"
              required
              className="px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last name"
              required
              className="px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email address (for order updates)"
            required
            className="w-full px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street Address, Apartment, Suite"
            required
            className="w-full px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              required
              className="px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State / Province"
              required
              className="px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={onChangeHandler}
              placeholder="Pincode / Postal Code"
              required
              className="px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              required
              className="px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Mobile Phone Number"
            required
            className="w-full px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Right Column: Order Summary & Payment Method */}
        <div className="lg:col-span-5 space-y-6">
          <CartTotal />

          {/* Payment Method Selector */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider">
              <RiSecurePaymentLine className="text-lg" />
              <span>Payment Option</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Razorpay Option */}
              <div
                onClick={() => setMethod('razorpay')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  method === 'razorpay'
                    ? 'bg-cyan-500/10 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={razorpayLogo} alt="Razorpay" className="h-6 object-contain rounded" />
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  method === 'razorpay' ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-600'
                }`}>
                  {method === 'razorpay' && <RiCheckLine className="text-xs" />}
                </div>
              </div>

              {/* COD Option */}
              <div
                onClick={() => setMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  method === 'cod'
                    ? 'bg-cyan-500/10 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <RiBankCardLine className="text-cyan-400 text-lg" />
                  <span className="text-xs font-bold text-white">Cash on Delivery</span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  method === 'cod' ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-600'
                }`}>
                  {method === 'cod' && <RiCheckLine className="text-xs" />}
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 text-white font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              {loading ? <Loading /> : "CONFIRM & PLACE ORDER"}
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}

export default PlaceOrder;
