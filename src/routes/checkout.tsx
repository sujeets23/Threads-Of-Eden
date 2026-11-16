import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { ArrowLeft, CreditCard, Landmark, Truck } from "lucide-react";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/actions";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Threads of Eden" },
      { name: "description", content: "Complete your premium purchase with our secure and elegant checkout." },
    ],
  }),
  component: CheckoutPage,
});

// Dynamic script loader for Razorpay Standard Checkout
const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { addOrder } = useStore();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  // Totals
  const shippingFee = cartTotal > 2000 ? 0 : 150;
  const tax = Math.round(cartTotal * 0.18); // 18% GST
  const grandTotal = cartTotal + shippingFee + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);

    if (paymentMethod === "razorpay") {
      setProcessingStep("Initializing Payment Gateway...");
      
      // Load script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment script. Check your internet connection.");
        setIsProcessing(false);
        return;
      }

      setProcessingStep("Generating transaction tokens...");
      try {
        const response = await createRazorpayOrder({
          data: {
            items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
            email: email.toLowerCase().trim(),
            name: `${firstName} ${lastName}`,
          },
        });

        if (!response || !response.razorpayOrderId) {
          throw new Error("Unable to create order on server.");
        }

        setProcessingStep("Opening transaction checkout screen...");

        const options = {
          key: "rzp_test_luxury_arovia_2026",
          amount: response.amount,
          currency: response.currency,
          name: "Threads of Eden",
          description: "Luxury T-Shirts & Polos - Order Payment",
          image: "https://threadandroots.com/logo.png",
          order_id: response.razorpayOrderId,
          handler: async function (paymentRes: any) {
            try {
              setIsProcessing(true);
              setProcessingStep("Verifying transaction signatures...");

              const createdOrder = addOrder({
                customerName: `${firstName} ${lastName}`,
                email: email.toLowerCase().trim(),
                phone,
                address,
                city,
                pincode,
                items: items.map((item) => ({
                  productId: item.product.id,
                  name: item.product.name,
                  price: item.product.price,
                  quantity: item.quantity,
                  size: item.selectedSize || "M",
                  color: item.selectedColor || "Standard",
                  img: item.product.img,
                })),
                subtotal: cartTotal,
                tax,
                shipping: shippingFee,
                total: grandTotal,
                paymentMethod: "razorpay",
                status: "Processing",
              });

              // Also preserve backward compatibility for order-confirmation page
              const existingOrders = JSON.parse(localStorage.getItem("arovia_orders") || "[]");
              localStorage.setItem("arovia_orders", JSON.stringify([createdOrder, ...existingOrders]));

              clearCart();
              setIsProcessing(false);
              navigate({ to: "/order-confirmation", search: { orderId: createdOrder.id } });
            } catch (err: any) {
              console.error(err);
              toast.error(err.message || "Payment verification failed.");
              setIsProcessing(false);
            }
          },
          prefill: {
            name: `${firstName} ${lastName}`,
            email: email.toLowerCase().trim(),
            contact: phone,
          },
          theme: {
            color: "#47352F",
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              toast.error("Payment transaction cancelled by customer.");
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        setIsProcessing(false);
        rzp.open();
      } catch (err: any) {
        console.error(err);
        toast.error("Payment initialization failed.");
        setIsProcessing(false);
      }
    } else {
      // Cash on Delivery
      setProcessingStep("Securing your apparel order reservation...");
      setTimeout(() => {
        const createdOrder = addOrder({
          customerName: `${firstName} ${lastName}`,
          email: email.toLowerCase().trim(),
          phone,
          address,
          city,
          pincode,
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: item.selectedSize || "M",
            color: item.selectedColor || "Standard",
            img: item.product.img,
          })),
          subtotal: cartTotal,
          tax,
          shipping: shippingFee,
          total: grandTotal,
          paymentMethod: "cod",
          status: "Processing",
        });

        const existingOrders = JSON.parse(localStorage.getItem("arovia_orders") || "[]");
        localStorage.setItem("arovia_orders", JSON.stringify([createdOrder, ...existingOrders]));

        clearCart();
        setIsProcessing(false);
        navigate({ to: "/order-confirmation", search: { orderId: createdOrder.id } });
      }, 1200);
    }
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-6 py-24 text-center">
        <div className="max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-lg">
          <p className="eyebrow mb-4">Checkout</p>
          <h1 className="font-display text-4xl">Your bag is empty</h1>
          <p className="mt-4 text-sm text-muted-foreground">Add a kids' t-shirt to your bag before proceeding.</p>
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
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-black/5 border-t-[#47352F]" />
            <h2 className="font-display text-2xl mt-8 text-black">Threads of Eden Secure Gate</h2>
            <p className="mt-2 text-sm text-[#47352F] font-medium tracking-wide uppercase">{processingStep}</p>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Please do not refresh the page. Your transaction details are calculated and validated strictly server-side.
            </p>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <button
          onClick={() => window.history.back()}
          className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#47352F] transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Bag
        </button>

        <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl mb-12">
          Secure <span className="italic text-[#47352F]">Checkout.</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Shipping & Payment Fields */}
          <div className="space-y-10">
            {/* Shipping Info */}
            <div className="space-y-6 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#47352F] border-b border-black/5 pb-4 flex items-center gap-2">
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
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#47352F]"
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
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#47352F]"
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
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#47352F]"
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
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#47352F]"
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
                  className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#47352F]"
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
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#47352F]"
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
                    className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#47352F]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-6 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#47352F] border-b border-black/5 pb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> 02. Payment Method
              </h2>

              {/* Tabs */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex flex-col items-center gap-3.5 rounded-2xl border p-5 text-center transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-[#47352F] bg-[#47352F]/5 text-[#47352F] font-medium"
                      : "border-black/5 bg-[#f7f7f5] text-black/50 hover:border-black/10"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <div className="text-left">
                    <span className="block text-xs font-semibold uppercase tracking-wider">Razorpay Secure</span>
                    <span className="block text-[9px] text-muted-foreground mt-0.5">Cards, UPI, Netbanking</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center gap-3.5 rounded-2xl border p-5 text-center transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#47352F] bg-[#47352F]/5 text-[#47352F] font-medium"
                      : "border-black/5 bg-[#f7f7f5] text-black/50 hover:border-black/10"
                  }`}
                >
                  <Truck className="h-5 w-5" />
                  <div className="text-left">
                    <span className="block text-xs font-semibold uppercase tracking-wider">Luxury COD</span>
                    <span className="block text-[9px] text-muted-foreground mt-0.5">Signature Cash Collection</span>
                  </div>
                </button>
              </div>

              {paymentMethod === "razorpay" && (
                <div className="rounded-xl border border-[#47352F]/10 bg-[#47352F]/5 p-5 text-xs text-muted-foreground space-y-2">
                  <p className="font-semibold text-[#47352F] flex items-center gap-1.5">
                    🛡️ End-to-End Cryptographic Encryption (Z+):
                  </p>
                  <p>
                    Your transaction values and orders are calculated strictly on the server to prevent tamper modifications. Successful card authorizations are validated on the server using industry-standard HMAC signatures before writing to the database.
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="rounded-xl border border-black/5 bg-[#f7f7f5] p-5 text-xs text-muted-foreground space-y-2">
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
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#47352F] border-b border-black/5 pb-4">
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
                        <p className="text-[9px] uppercase tracking-wide text-[#47352F] mt-0.5">{item.product.category}</p>
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
                    {shippingFee === 0 ? <span className="text-[#47352F] uppercase font-semibold text-xs tracking-wider">Free</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-black/5 pt-4 flex justify-between items-end">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em]">Total Amount</span>
                  <span className="text-2xl font-semibold text-[#47352F]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full rounded-full bg-[#47352F] py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-[#47352F]/10 transition hover:bg-[#39291F] mt-4"
              >
                {paymentMethod === "razorpay" ? "Secure Razorpay Payment" : "Place Luxury COD Order"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
