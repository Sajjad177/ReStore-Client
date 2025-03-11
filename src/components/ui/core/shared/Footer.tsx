import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t py-8 mt-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Restore
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Providing quality products since 2024.
            </p>
          </div>

          {/* Social Media Section */}
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-pink-600 dark:hover:text-pink-400"
            >
              <Instagram className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-sky-600 dark:hover:text-sky-400"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-gray-600 dark:hover:text-gray-400"
            >
              <Github className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Restore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
