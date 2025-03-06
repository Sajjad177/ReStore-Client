"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-900 border">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center ">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-emerald-500">Restore</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
          <li>
            <Link href="/" className="hover:text-emerald-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-emerald-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-emerald-500 transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-emerald-500 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <Link href="/login">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-6">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col space-y-6 mt-6">
                <Link
                  href="/"
                  className="text-lg hover:text-emerald-500"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-lg hover:text-emerald-500"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-lg hover:text-emerald-500"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="text-lg hover:text-emerald-500"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md mt-4">
                  Get Started
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
