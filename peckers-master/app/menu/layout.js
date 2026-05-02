"use client";

import { usePathname } from "next/navigation";
import SubNavbar from "./components/SubNavbar";

export default function MenuLayout({ children }) {
  const pathname = usePathname();
  const isAllergensPage = pathname === "/menu/allergens";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {!isAllergensPage && <SubNavbar />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
