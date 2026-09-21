import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import Topbar from "../UserComponents/Topbar";
import Header from "../UserComponents/Header";
import Footer from "../UserComponents/Footer";
import Copyright from "../UserComponents/Copyright";
import productsData from "../Json/Product.json";

interface Product {
  id: string;
  name: string;
  category: string;
  animal: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  description: string;
  image: string;
  features?: string[];
}

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  selected: boolean;
}

const TAX_RATE = 0.13;
const MIN_QTY = 1;

const formatRs = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
const itemCountLabel = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;

// Pre-load exactly 2 products from JSON as initial cart
const initialItems: CartItem[] = (productsData as Product[]).slice(0, 2).map((p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  price: p.price,
  image: p.image,
  stock: p.stock,
  quantity: 1,
  selected: true,
}));

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  // ─── helpers ───────────────────────────────────────────────────────────────

  const selectedItems = items.filter((i) => i.selected);

  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxAmount = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxAmount;

  const allSelected =
    items.length > 0 && items.every((i) => i.selected);

  // ─── actions ───────────────────────────────────────────────────────────────

  const toggleSelect = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  };

  const toggleSelectAll = () => {
    setItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
  };

  const changeQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const next = Math.min(i.stock, Math.max(MIN_QTY, i.quantity + delta));
        return { ...i, quantity: next };
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearAll = () => setItems([]);

  // ─── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            My Cart
          </h1>
          <p className="text-sm text-gray-500">Review items, then checkout.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* ── Left: item list ── */}
          <section className="flex-1 w-full min-w-0">
            {/* toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  disabled={items.length === 0}
                  className="w-4 h-4 rounded accent-emerald-600 border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
                Select all
                <span className="text-gray-400 font-normal">
                  {" "}({itemCountLabel(items.length)})
                </span>
              </label>

              <button
                type="button"
                onClick={clearAll}
                disabled={items.length === 0}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 hover:underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
              >
                <HiOutlineTrash className="w-4 h-4 shrink-0" />
                Delete all
              </button>
            </div>

            {/* cart items */}
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
                  <p className="mb-3 text-sm">Your cart is empty.</p>
                  <Link
                    to="/products"
                    className="text-emerald-600 font-semibold text-sm hover:underline"
                  >
                    Browse products →
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const lineTotal = item.price * item.quantity;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                        item.selected
                          ? "border-emerald-500 bg-emerald-50/40 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {/* checkbox */}
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelect(item.id)}
                        className="w-4 h-4 rounded accent-emerald-600 border-gray-300 shrink-0 cursor-pointer"
                      />

                      {/* product image */}
                      <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      {/* info */}
                      <div className="flex flex-1 min-w-0 flex-col gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 leading-snug text-sm sm:text-base truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.brand}</p>
                          <p className="text-emerald-600 font-bold mt-1 text-sm">
                            {formatRs(item.price)}
                            <span className="text-xs text-gray-400 font-normal ml-1">/ unit</span>
                          </p>
                        </div>

                        {/* quantity stepper */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">Qty:</span>
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
                            <button
                              type="button"
                              onClick={() => changeQty(item.id, -1)}
                              disabled={item.quantity <= MIN_QTY}
                              className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <HiOutlineMinus className="w-3.5 h-3.5" />
                            </button>
                            <span className="min-w-8 text-center text-sm font-semibold text-gray-900 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => changeQty(item.id, 1)}
                              disabled={item.quantity >= item.stock}
                              className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <HiOutlinePlus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs text-gray-500 ml-auto font-medium">
                            = {formatRs(lineTotal)}
                          </span>
                        </div>
                      </div>

                      {/* remove button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* ── Right: order summary ── */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                {/* selected items list */}
                {selectedItems.length > 0 && (
                  <div className="space-y-1.5 pb-3 border-b border-gray-200">
                    {selectedItems.map((i) => (
                      <div key={i.id} className="flex justify-between gap-2 text-xs text-gray-500">
                        <span className="truncate">{i.name}</span>
                        <span className="shrink-0 font-medium text-gray-700">
                          {formatRs(i.price * i.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {selectedItems.length > 0 ? formatRs(subtotal) : "—"}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (13%)</span>
                  <span className="font-medium text-gray-900">
                    {selectedItems.length > 0 ? formatRs(taxAmount) : "—"}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-emerald-600">
                    {selectedItems.length > 0 ? formatRs(total) : "—"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={selectedItems.length === 0}
                className="w-full mt-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    selectedItems.length > 0
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      : "#9ca3af",
                }}
              >
                Proceed to Checkout
              </button>

              {selectedItems.length === 0 && (
                <p className="mt-3 text-xs text-gray-400 text-center">
                  Select at least one item to checkout.
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <Copyright />
    </div>
  );
};

export default Cart;
