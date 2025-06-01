import { WishlistProvider } from "../context/WishlistContext";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from '../context/CartContext';
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopNest - Your One-Stop E-Commerce Solution",
  description: "Modern e-commerce platform with a wide range of products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900`}>
        <CartProvider>
          <WishlistProvider>
            <Toaster position="top-center" />
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
