import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { CartDrawer } from "../components/CartDrawer";
import { StoreProvider } from "../context/StoreContext";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404 — Not Found</p>
        <h1 className="mt-6 font-display text-5xl text-foreground">This page has drifted</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you seek does not exist. Return to the ritual.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-luxe">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error("Root error boundary caught:", error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const handleClearCacheAndReset = () => {
    try {
      if (typeof window !== "undefined") {
        const keysToRemove = [
          "thread_roots_products_v6",
          "thread_roots_products_v5",
          "thread_roots_categories_v4",
          "thread_roots_settings_v5",
          "thread_roots_settings_v4",
          "thread_roots_settings_v3",
          "thread_roots_products_v4",
          "thread_roots_products_v3",
          "thread_roots_categories_v3",
          "thread_roots_orders_v3",
          "threads_eden_user_session",
          "threads_eden_registered_users",
          "thread_and_roots_cart",
          "arovia_cart_v2",
          "arovia_apparel_products_v2",
          "arovia_apparel_categories_v2",
          "arovia_apparel_settings_v2",
          "arovia_apparel_orders_v2",
        ];
        keysToRemove.forEach((k) => localStorage.removeItem(k));
        window.location.href = "/";
      }
    } catch {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf7f0] px-4 py-16">
      <div className="max-w-md w-full text-center rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#47352F]/10 text-2xl">
          ✝️
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#221b18]">
          Something went astray
        </h1>
        <p className="mt-3 text-sm text-[#47352F]/80 leading-relaxed">
          A temporary view error interrupted the page. You can try refreshing or resetting to clean
          defaults below.
        </p>

        {Boolean(error) && (
          <div className="mt-4 max-h-32 overflow-auto rounded-lg border border-black/10 bg-[#f7f2eb] p-3 text-left text-xs font-mono text-[#47352F]">
            {error instanceof Error ? error.message : String(error)}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-[#47352F] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#34241f] transition"
          >
            Try Again
          </button>
          <button
            onClick={handleClearCacheAndReset}
            className="rounded-full border border-[#47352F] bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#47352F] hover:bg-[#47352F] hover:text-white transition"
          >
            Clear Cache & Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Threads of Eden — Kids' T-Shirts for Little Adventures" },
      {
        name: "description",
        content:
          "Shop kids' oversized t-shirts, polo t-shirts, round neck tees, and festive Christmas edition styles.",
      },
      { name: "author", content: "Threads of Eden" },
      { property: "og:title", content: "Threads of Eden — Kids' T-Shirts for Little Adventures" },
      {
        property: "og:description",
        content: "Playful oversized, polo, round neck, and Christmas edition t-shirts for kids.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "data:," },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://api.fontshare.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600&f[]=satoshi@300,400,500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>
          <CartProvider>
            <AppLayout />
            <Toaster position="bottom-right" richColors />
          </CartProvider>
        </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

function AppLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <CartDrawer />
    </>
  );
}
