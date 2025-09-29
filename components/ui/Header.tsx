"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { useBasketStore } from "@/app/(store)/stores";

function Header() {
  const { user } = useUser();
  const ItemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const { openSignIn } = useClerk();

  const createClerkPasskey = async (): Promise<void> => {
    if (!user) {
      console.warn("User not signed in");
      return;
    }

    try {
      const response = await user.createPasskey();
      console.log("Passkey created:", response);
    } catch (err: unknown) {
      console.error("Error creating passkey:", err);

      // Safely check error shape
      const error = err as { errors?: { code?: string }[] };

      if (error?.errors?.[0]?.code === "feature_not_enabled") {
        alert("Passkeys are not enabled in your Clerk project. Enable them in the Clerk Dashboard.");
        return;
      }

      if (error?.errors?.[0]?.code === "session_reverification_required") {
        console.log("Session needs re-verification, opening sign-in...");
        await openSignIn({ redirectUrl: window.location.href });

        // Retry once after modal
        setTimeout(() => {
          void createClerkPasskey();
        }, 1000);
        return;
      }
    }
  };

  return (
    <header className="bg-white shadow-sm px-4 py-2">
      <div className="flex items-center justify-between space-x-4">
        {/* LEFT: Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer"
        >
          ClickCart
        </Link>

        {/* MIDDLE: Search */}
        <form action="/search" className="flex-1 max-w-xl">
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border"
          />
        </form>

        {/* RIGHT: User actions */}
        <div className="flex flex-nowrap items-center space-x-3">
          {/* My Basket */}
          <Link
            href="/basket"
            className="relative flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className="hidden sm:inline">My Basket</span>
            {ItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full
              w-5 h-5 flex items-center justify-center text-xs">
                {ItemCount}
              </span>
            )}
          </Link>

          <ClerkLoaded>
            {/* My Orders */}
            {user && (
              <Link
                href="/orders"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span className="hidden sm:inline">My Orders</span>
              </Link>
            )}

            {/* User Info / Sign In */}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs leading-tight">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {/* Passkey Button */}
            {user && (user.passkeys?.length ?? 0) === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-3 rounded border border-blue-300"
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
