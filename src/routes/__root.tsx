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
import favicon96 from "../assets/favicon/favicon-96x96.png?url";
import faviconSvg from "../assets/favicon/favicon.svg?url";
import faviconIco from "../assets/favicon/favicon.ico?url";
import appleTouchIcon from "../assets/favicon/apple-touch-icon.png?url";
import siteManifest from "../assets/favicon/site.webmanifest?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

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
          <Link to="/" className="btn-luxe">Return home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-foreground">Something went astray</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A quiet error interrupted the page. You may try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-luxe"
          >
            Try again
          </button>
          <a href="/" className="btn-luxe">Go home</a>
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
      { title: "Arovia Essentials — Nature Distilled, Luxury Refined" },
      { name: "description", content: "Arovia Essentials crafts botanical skincare from rare, cold-pressed ingredients. Editorial rituals for the modern connoisseur." },
      { name: "author", content: "Arovia Essentials" },
      { property: "og:title", content: "Arovia Essentials — Nature Distilled, Luxury Refined" },
      { property: "og:description", content: "Botanical skincare crafted from rare, cold-pressed ingredients." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: favicon96, sizes: "96x96" },
      { rel: "icon", type: "image/svg+xml", href: faviconSvg },
      { rel: "shortcut icon", href: faviconIco },
      { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon },
      { rel: "manifest", href: siteManifest },
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
      <Outlet />
    </QueryClientProvider>
  );
}
