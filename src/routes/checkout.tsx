import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, CreditCard, Landmark, Truck } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Arovia Essentials" },
      { name: "description", content: "Complete your premium ritual purchase with our secure and elegant checkout." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  // Totals
  const shippingFee = cartTotal > 2000 ? 0 : 150;
  const tax = Math.round(cartTotal * 0.18); // 18% GST
  const grandTotal = cartTotal + shippingFee + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Simulate payment gateway loading
    setIsProcessing(true);
    setProcessingStep("Verifying items in stock...");

    setTimeout(() => {
      setProcessingStep("Securing premium SSL connection...");
      setTimeout(() => {
        setProcessingStep(
          paymentMethod === "card"
            ? "Authorizing transaction with bank..."
            : paymentMethod === "upi"
            ? "Awaiting UPI app approval..."
            : "Logging Cash on Delivery order..."
        );
        setTimeout(() => {
          // Generate unique order ID
          const orderId = `AE-2026-${Math.floor(10000 + Math.random() * 90000)}`;

          // Create order object
          const newOrder = {
            id: orderId,
            email: email.toLowerCase().trim(),
            name: `${firstName} ${lastName}`,
            phone,
            address: `${address}, ${city} - ${pincode}`,
            items: items.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
              img: item.product.img,
            })),
            subtotal: cartTotal,
            shipping: shippingFee,
            tax,
            total: grandTotal,
            status: "Placed",
            createdAt: new Date().toISOString(),
          };

          // Save to local storage database
          try {
            const existingOrders = JSON.parse(localStorage.getItem("arovia_orders") || "[]");
            localStorage.setItem("arovia_orders", JSON.stringify([newOrder, ...existingOrders]));
          } catch (err) {
            console.error("Failed to save order", err);
          }

          // Clear cart and redirect
          clearCart();
          setIsProcessing(false);
          navigate({ to: "/order-confirmation", search: { orderId } });
        }, 1500);
      }, 1200);
    }, 1000);
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-6 py-24 text-center">
        <div className="max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-lg">
          <p className="eyebrow mb-4">Checkout</p>
          <h1 className="font-display text-4xl">Your bag is empty</h1>
          <p className="mt-4 text-sm text-muted-foreground">Add botanical formulations to your bag before proceeding.</p>
          <div className="mt-8">
            <a href="/shop" className="btn-luxe">Back to Boutique</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground relative min-h-screen">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
          <div className="relative flex flex-col items-center max-w-sm text-center px-6">
            {/* Spinning Indicator */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-black/5 border-t-[#2C5D2E]" />
            <h2 className="font-display text-2xl mt-8 text-black">Arovia Vault</h2>
            <p className="mt-2 text-sm text-[#2C5D2E] font-medium tracking-wide uppercase">{processingStep}</p>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Please do not refresh the page or click back. Your premium transaction is being processed securely.
            </p>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2C5D2E] transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Bag
        </button>

        <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl mb-12">
          Secure <span className="italic text-[#2C5D2E]">Checkout.</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Shipping & Payment Fields */}
          <div className="space-y-10">
            {/* Shipping Info */}
            <div className="space-y-6 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2C5D2E] border-b border-black/5 pb-4 flex items-center gap-2">
                <Truck className="h-4 w-4" /> 01. Shipping & Contact details
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="E.g. Elena"
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="E.g. Rostova"
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E.g. name@domain.com"
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="E.g. +91 98765 43210"
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, apartment, suite"
                  className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="E.g. Mumbai"
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="E.g. 400001"
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-6 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2C5D2E] border-b border-black/5 pb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> 02. Payment Information
              </h2>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                    paymentMethod === "card"
                      ? "border-[#2C5D2E] bg-[#2C5D2E]/5 text-[#2C5D2E] font-medium"
                      : "border-black/5 bg-[#f7f7f5] text-black/50 hover:border-black/10"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-wider">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                    paymentMethod === "upi"
                      ? "border-[#2C5D2E] bg-[#2C5D2E]/5 text-[#2C5D2E] font-medium"
                      : "border-black/5 bg-[#f7f7f5] text-black/50 hover:border-black/10"
                  }`}
                >
                  <Landmark className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-wider">UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#2C5D2E] bg-[#2C5D2E]/5 text-[#2C5D2E] font-medium"
                      : "border-black/5 bg-[#f7f7f5] text-black/50 hover:border-black/10"
                  }`}
                >
                  <Truck className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-wider">COD</span>
                </button>
              </div>

              {/* Form Render based on selection */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Cardholder Name</label>
                    <input
                      type="text"
                      required={paymentMethod === "card"}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name as it appears on card"
                      className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Card Number</label>
                    <input
                      type="text"
                      required={paymentMethod === "card"}
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        // format to 1234 5678 1234 5678
                        const v = e.target.value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
                        setCardNumber(v);
                      }}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                    />
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Expiration Date</label>
                      <input
                        type="text"
                        required={paymentMethod === "card"}
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          const v = e.target.value.replace(
                            /^([1-9]\/|[2-9])$/g,
                            "0$1/"
                          ).replace(
                            /^(0[1-9]|1[0-2])$/g,
                            "$1/"
                          );
                          setCardExpiry(v);
                        }}
                        placeholder="MM/YY"
                        className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">CVV</label>
                      <input
                        type="password"
                        required={paymentMethod === "card"}
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                        placeholder="123"
                        className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">UPI ID</label>
                    <input
                      type="text"
                      required={paymentMethod === "upi"}
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. name@upi"
                      className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="rounded-xl border border-black/5 bg-[#f7f7f5] p-5 text-sm text-muted-foreground space-y-2">
                  <p className="font-semibold text-black">Luxury Cash On Delivery service:</p>
                  <p>
                    A premium delivery handler will collect the cash amount upon delivery. A signature authentication is required. Free delivery applies.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f5] p-8 shadow-sm space-y-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2C5D2E] border-b border-black/5 pb-4">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="max-h-[360px] overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-black/5 pb-4 last:border-0 last:pb-0">
                    <img src={item.product.img} alt={item.product.name} className="h-16 w-14 object-cover rounded-lg bg-secondary shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-medium text-black line-clamp-1">{item.product.name}</h4>
                        <p className="text-[9px] uppercase tracking-wide text-[#2C5D2E] mt-0.5">{item.product.category}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="font-medium text-black">{item.product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Math breakdown */}
              <div className="border-t border-black/5 pt-4 space-y-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes (18% GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? <span className="text-[#2C5D2E] uppercase font-semibold text-xs tracking-wider">Free</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-black/5 pt-4 flex justify-between items-end">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em]">Total Amount</span>
                  <span className="text-2xl font-semibold text-[#2C5D2E]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full rounded-full bg-[#2C5D2E] py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-[#2C5D2E]/10 transition hover:bg-[#1a3d1b] mt-4"
              >
                Place Luxury Order
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
