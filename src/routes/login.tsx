import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User as UserIcon,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Package,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/top right logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In & Register — Threads of Eden" },
      {
        name: "description",
        content:
          "Access your Threads of Eden account. Enjoy early drop access, curated kidswear collections, and seamless order management.",
      },
    ],
  }),
  component: LoginPage,
});

export function LoginPage({ initialTab = "signin" }: { initialTab?: "signin" | "signup" }) {
  const [tab, setTab] = useState<"signin" | "signup">(initialTab);
  const { user, login, signup, socialLogin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSignInSubmitting, setIsSignInSubmitting] = useState(false);

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSignUpSubmitting, setIsSignUpSubmitting] = useState(false);

  // Forgot password modal state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignInSubmitting(true);
    const success = await login(signInEmail, signInPassword);
    setIsSignInSubmitting(false);
    if (success) {
      setTimeout(() => {
        navigate({ to: "/" });
      }, 500);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }

    setIsSignUpSubmitting(true);
    const success = await signup(signUpName, signUpEmail, signUpPassword);
    setIsSignUpSubmitting(false);
    if (success) {
      setTimeout(() => {
        navigate({ to: "/" });
      }, 500);
    }
  };

  const fillDemoCredentials = () => {
    setSignInEmail("eleanor@threadsofeeden.com");
    setSignInPassword("password123");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f2eb] pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-12">
        {/* Top Breadcrumb & Brand Accent */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#47352f]/70 hover:text-[#47352f] transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Back to Atelier
          </Link>
          <span className="eyebrow text-[#47352f]/60 hidden sm:inline">
            Member Privilege & Care
          </span>
        </div>

        {/* If Already Logged In: Display Account Dashboard */}
        {isAuthenticated && user ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#dcc9b8] bg-[#fbf7f0] p-8 shadow-sm md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#47352f] text-2xl font-serif font-bold text-[#fbf7f0] shadow-md">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <h1 className="mt-4 font-display text-3xl text-[#2a201d] md:text-4xl">
                Welcome, {user.name}
              </h1>
              <p className="mt-1 text-sm text-[#47352f]/70">{user.email}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#c39a5b]/15 px-3 py-1 text-xs font-semibold text-[#47352f]">
                <Sparkles className="h-3.5 w-3.5 text-[#c39a5b]" />
                Eden Circle Member
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                to="/shop"
                className="flex items-center gap-4 rounded-2xl border border-[#dcc9b8] bg-[#f7f2eb] p-5 transition hover:border-[#47352f] hover:bg-[#efe0d0]/40 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#47352f] text-white">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#2a201d] group-hover:text-[#47352f]">
                    Explore Collection
                  </h3>
                  <p className="text-xs text-black/60">Shop kids' tees & new drops</p>
                </div>
              </Link>

              <a
                href="/order-tracking"
                className="flex items-center gap-4 rounded-2xl border border-[#dcc9b8] bg-[#f7f2eb] p-5 transition hover:border-[#47352f] hover:bg-[#efe0d0]/40 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c39a5b] text-[#2a201d]">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#2a201d] group-hover:text-[#47352f]">
                    Order Tracking
                  </h3>
                  <p className="text-xs text-black/60">Live delivery updates</p>
                </div>
              </a>

              <a
                href="/admin"
                className="flex items-center gap-4 rounded-2xl border border-[#dcc9b8] bg-[#f7f2eb] p-5 transition hover:border-[#47352f] hover:bg-[#efe0d0]/40 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3b2d29] text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#2a201d] group-hover:text-[#47352f]">
                    Admin Console
                  </h3>
                  <p className="text-xs text-black/60">Manage products & orders</p>
                </div>
              </a>

              <button
                onClick={logout}
                className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50/40 p-5 text-left transition hover:border-red-300 hover:bg-red-50 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700">
                  <LogOut className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-red-800">Sign Out</h3>
                  <p className="text-xs text-red-600/80">End your current session</p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Main Auth Split Container */
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[#dcc9b8] bg-[#fbf7f0] shadow-xl lg:grid-cols-12">
            {/* Left Column: Form Container */}
            <div className="p-6 sm:p-10 md:p-14 lg:col-span-7">
              {/* Brand Logo & Header */}
              <div className="flex flex-col items-center text-center">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Threads of Eden"
                    className="h-12 w-auto object-contain md:h-14 transition-transform hover:scale-105"
                  />
                </Link>

                <h1 className="mt-6 font-display text-3xl font-light tracking-tight text-[#2a201d] md:text-4xl">
                  {tab === "signin" ? "Welcome Back to Eden" : "Create Your Eden Account"}
                </h1>
                <p className="mt-2 max-w-md text-sm text-[#47352f]/70">
                  {tab === "signin"
                    ? "Sign in to track orders, save favorites, and enjoy priority access to seasonal drops."
                    : "Join our community for early access to limited edition kids' styles, fit perks, and private previews."}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="mt-8 flex rounded-full bg-[#f2ebe0] p-1.5 border border-[#dcc9b8]/60">
                <button
                  type="button"
                  onClick={() => setTab("signin")}
                  className={`flex-1 rounded-full py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                    tab === "signin"
                      ? "bg-[#47352f] text-white shadow-sm"
                      : "text-[#2a201d]/70 hover:text-[#47352f]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setTab("signup")}
                  className={`flex-1 rounded-full py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                    tab === "signup"
                      ? "bg-[#47352f] text-white shadow-sm"
                      : "text-[#2a201d]/70 hover:text-[#47352f]"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Quick Demo Credentials Helper */}
              {tab === "signin" && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] px-4 py-2.5 text-xs">
                  <span className="text-[#47352f]/80">Demo: eleanor@threadsofeeden.com</span>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="font-semibold text-[#47352f] underline hover:text-black transition"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}

              {/* Forms */}
              <AnimatePresence mode="wait">
                {tab === "signin" ? (
                  <motion.form
                    key="signin"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSignIn}
                    className="mt-8 space-y-5"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#47352f] mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#47352f]/50" />
                        <input
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="parent@example.com"
                          className="w-full rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] pl-11 pr-4 py-3.5 text-sm text-[#2a201d] placeholder:text-black/35 focus:border-[#47352f] focus:bg-[#fbf7f0] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#47352f]">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setForgotPasswordOpen(true)}
                          className="text-xs text-[#c39a5b] hover:text-[#47352f] transition hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#47352f]/50" />
                        <input
                          type={showSignInPassword ? "text" : "password"}
                          required
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] pl-11 pr-11 py-3.5 text-sm text-[#2a201d] placeholder:text-black/35 focus:border-[#47352f] focus:bg-[#fbf7f0] focus:outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#47352f]/50 hover:text-[#47352f]"
                        >
                          {showSignInPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-[#47352f]">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 rounded border-[#dcc9b8] text-[#47352f] focus:ring-[#47352f]"
                        />
                        <span>Remember my device</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSignInSubmitting}
                      className="w-full rounded-full bg-[#47352f] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#fbf7f0] shadow-md transition-all hover:bg-[#34241f] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSignInSubmitting ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <span>Sign In to Eden</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSignUp}
                    className="mt-8 space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#47352f] mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#47352f]/50" />
                        <input
                          type="text"
                          required
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="Eleanor Vance"
                          className="w-full rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] pl-11 pr-4 py-3.5 text-sm text-[#2a201d] placeholder:text-black/35 focus:border-[#47352f] focus:bg-[#fbf7f0] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#47352f] mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#47352f]/50" />
                        <input
                          type="email"
                          required
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="eleanor@example.com"
                          className="w-full rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] pl-11 pr-4 py-3.5 text-sm text-[#2a201d] placeholder:text-black/35 focus:border-[#47352f] focus:bg-[#fbf7f0] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#47352f] mb-2">
                        Password (6+ characters)
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#47352f]/50" />
                        <input
                          type={showSignUpPassword ? "text" : "password"}
                          required
                          minLength={6}
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] pl-11 pr-11 py-3.5 text-sm text-[#2a201d] placeholder:text-black/35 focus:border-[#47352f] focus:bg-[#fbf7f0] focus:outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#47352f]/50 hover:text-[#47352f]"
                        >
                          {showSignUpPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#47352f] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#47352f]/50" />
                        <input
                          type="password"
                          required
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] pl-11 pr-4 py-3.5 text-sm text-[#2a201d] placeholder:text-black/35 focus:border-[#47352f] focus:bg-[#fbf7f0] focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 text-xs">
                      <label className="flex items-start gap-2.5 cursor-pointer text-[#47352f]">
                        <input
                          type="checkbox"
                          checked={subscribeNewsletter}
                          onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-[#dcc9b8] text-[#47352f] focus:ring-[#47352f]"
                        />
                        <span>
                          Notify me of holiday editions, festive secret drops, and playful kids'
                          style guides.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer text-[#47352f]">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-[#dcc9b8] text-[#47352f] focus:ring-[#47352f]"
                        />
                        <span>
                          I agree to Threads of Eden's{" "}
                          <Link to="/terms" className="underline hover:text-black">
                            Terms of Service
                          </Link>{" "}
                          &{" "}
                          <Link to="/privacy" className="underline hover:text-black">
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSignUpSubmitting}
                      className="w-full rounded-full bg-[#47352f] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#fbf7f0] shadow-md transition-all hover:bg-[#34241f] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                    >
                      {isSignUpSubmitting ? (
                        <span>Creating Account...</span>
                      ) : (
                        <>
                          <span>Join Threads of Eden</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Social Login Options */}
              <div className="mt-8">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#dcc9b8]"></div>
                  </div>
                  <span className="relative bg-[#fbf7f0] px-4 text-xs uppercase tracking-[0.15em] text-[#47352f]/60">
                    Or continue with
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => socialLogin("google")}
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] py-3 text-xs font-semibold text-[#2a201d] transition hover:border-[#47352f] hover:bg-[#fbf7f0]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => socialLogin("apple")}
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] py-3 text-xs font-semibold text-[#2a201d] transition hover:border-[#47352f] hover:bg-[#fbf7f0]"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.65 1.38-.56.65-.99 1.72-.86 2.76 1.04.08 2.05-.56 2.59-1.27z" />
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Atmosphere Panel */}
            <div className="relative hidden bg-[#47352f] p-12 text-[#fbf7f0] lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
              {/* Background Texture & Image */}
              <div className="absolute inset-0 opacity-25">
                <img
                  src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200&auto=format&fit=crop&q=85"
                  alt="Threads of Eden atelier styles"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#221b18] via-[#47352f]/90 to-[#47352f]/70" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#e5cfac]/40 bg-[#e5cfac]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5cfac]">
                  <Sparkles className="h-3 w-3" />
                  Eden Privilege Club
                </div>
                <h2 className="mt-6 font-display text-3xl font-light leading-snug text-white xl:text-4xl">
                  Made for play.
                  <br />
                  <span className="italic text-[#e5cfac]">Ready for every day.</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#fbf7f0]/80">
                  Join families who appreciate thoughtful craftsmanship, ultrasoft organic cotton,
                  and kidswear designed to move with ease.
                </p>
              </div>

              {/* Perks List */}
              <div className="relative z-10 my-10 space-y-4 border-y border-[#fbf7f0]/15 py-8">
                {[
                  {
                    title: "First Access to Secret Drops",
                    desc: "Shop limited holiday tees 48 hours before general release",
                  },
                  {
                    title: "Complimentary Express Delivery",
                    desc: "Free courier doorstep shipping on domestic orders over $75",
                  },
                  {
                    title: "100% Gentle Combed Cotton",
                    desc: "Breathable, itch-free, and safe for sensitive young skin",
                  },
                  {
                    title: "Easy 7-Day Returns & Exchanges",
                    desc: "Hassle-free 7-day returns & swaps for the perfect fit",
                  },
                ].map((perk) => (
                  <div key={perk.title} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#e5cfac] mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-white tracking-wide">{perk.title}</p>
                      <p className="text-[11px] text-[#fbf7f0]/70">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Seal */}
              <div className="relative z-10 flex items-center gap-3 text-xs text-[#fbf7f0]/70">
                <ShieldCheck className="h-5 w-5 text-[#e5cfac]" />
                <span>256-Bit SSL Encrypted & Privacy Protected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setForgotPasswordOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-[#dcc9b8] bg-[#fbf7f0] p-8 shadow-2xl"
            >
              <h3 className="font-display text-2xl text-[#2a201d]">Reset Password</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#47352f]/70">
                Enter your email address and we'll send you an invitation link to reset your Eden
                account password.
              </p>

              {forgotSent ? (
                <div className="mt-6 rounded-2xl bg-[#f2ebe0] p-5 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-[#47352f]" />
                  <p className="mt-3 text-sm font-semibold text-[#2a201d]">Reset link dispatched</p>
                  <p className="mt-1 text-xs text-[#47352f]/70">
                    If an account matches {forgotEmail}, instructions have been sent.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordOpen(false);
                      setForgotSent(false);
                    }}
                    className="mt-5 w-full rounded-full bg-[#47352f] py-3 text-xs font-semibold uppercase tracking-wider text-[#fbf7f0]"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#47352f] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full rounded-xl border border-[#dcc9b8] bg-[#f7f2eb] px-4 py-3 text-sm text-[#2a201d] focus:border-[#47352f] focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(false)}
                      className="flex-1 rounded-full border border-[#dcc9b8] py-3 text-xs font-semibold uppercase tracking-wider text-[#47352f] hover:bg-[#f2ebe0]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-full bg-[#47352f] py-3 text-xs font-semibold uppercase tracking-wider text-[#fbf7f0] hover:bg-[#34241f]"
                    >
                      Send Link
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
