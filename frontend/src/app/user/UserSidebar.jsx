"use client";
import { IconUser, IconTruck, IconClipboardList, IconHeart, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      title: "Profile",
      href: "/user/profile",
      icon: IconUser,
    },
    {
      title: "Track Orders",
      href: "/user/track-order",
      icon: IconTruck,
    },
    {
      title: "View Orders",
      href: "/user/view-order",
      icon: IconClipboardList,
    },
    {
      title: "Wishlist",
      href: "/user/wishlist",
      icon: IconHeart,
    },
    {
      title: "Cart",
      href: "/user/cart",
      icon: IconShoppingCart,
    },
  ];
  return (    <div className="min-h-screen bg-slate-700 text-white p-4 relative z-0">
      <div className="border-b border-gray-700 pb-4 mb-4">
        <h2 className="text-2xl font-bold">User Menu</h2>
      </div>
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Icon size={20} />
            <span>{link.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default UserSidebar;
