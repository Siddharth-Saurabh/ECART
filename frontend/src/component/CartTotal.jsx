import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { RiShieldCheckLine } from 'react-icons/ri';

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);
  const subtotal = getCartAmount();
  const finalTotal = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white tracking-wide border-b border-slate-800 pb-3">
        ORDER SUMMARY
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{currency}{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-white">
            {subtotal === 0 ? `${currency}0` : `${currency}${delivery_fee}`}
          </span>
        </div>

        <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
          <span className="text-base font-bold text-white">Grand Total</span>
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {currency}{finalTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
        <RiShieldCheckLine className="text-emerald-400 text-sm shrink-0" />
        <span>Secured with 256-Bit SSL Encryption</span>
      </div>
    </div>
  );
}

export default CartTotal;
