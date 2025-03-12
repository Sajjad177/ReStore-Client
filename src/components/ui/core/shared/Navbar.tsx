"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/authService";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Navbar = () => {
  const { user, setIsLoading, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoading(true);
    setUser(null);
    setIsOpen(false); // Close menu on logout
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-emerald-500 hover:text-emerald-600 transition-all">
            Restore
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
          <li>
            <Link href="/" className="hover:text-emerald-500 transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-emerald-500 transition-all"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-emerald-500 transition-all"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/listings"
              className="hover:text-emerald-500 transition-all"
            >
              All Listings
            </Link>
          </li>
        </ul>

        {/* Authentication Buttons */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Button
                onClick={handleLogout}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-6 shadow-md cursor-pointer"
              >
                Logout
              </Button>
              <Link href="/user/dashboard">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-6 shadow-md cursor-pointer">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-6 shadow-md cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200 cursor-pointer" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 bg-white dark:bg-gray-900 p-6 rounded-r-lg shadow-lg"
            >
              {/* Required for Accessibility */}
              <VisuallyHidden>
                <SheetTitle>Menu</SheetTitle>
              </VisuallyHidden>

              <nav className="flex flex-col space-y-6 mt-6">
                <Link
                  href="/"
                  className="text-lg hover:text-emerald-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-lg hover:text-emerald-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-lg hover:text-emerald-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="text-lg hover:text-emerald-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                {user ? (
                  <>
                    <Button
                      onClick={handleLogout}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md mt-4 shadow-md"
                    >
                      Logout
                    </Button>
                    <Link
                      href="/user/dashboard"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md mt-4 shadow-md cursor-pointer">
                        Dashboard
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md mt-4 shadow-md cursor-pointer">
                      Login
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
