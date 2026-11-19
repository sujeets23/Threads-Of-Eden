import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Threads of Eden" },
      {
        name: "description",
        content:
          "Join Threads of Eden. Create an account for exclusive early access to playful, comfortable kids' t-shirt collections and special releases.",
      },
    ],
  }),
  component: () => <LoginPage initialTab="signup" />,
});
