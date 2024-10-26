import SearchButton from "@/components/SearchButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between h-16 bg-slate-200 px-4">
            <div className="flex items-center gap-x-2">
              <Avatar>
                <AvatarImage src="/assets/guava.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="Capitalize text-xl font-black text-zinc-700">
                {" "}
                Sr Fruits Inventory
              </div>
            </div>
            <div className="border-2 border-black rounded-sm cursor-pointer">
              <Sheet>
                <SheetTrigger asChild>
                  <div>
                    <AlignJustify />
                  </div>
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader className="flex flex-row gap-x-2 items-center">
                    <Avatar>
                      <AvatarImage src="/assets/guava.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <SheetTitle className="Capitalize text-lg font-black text-zinc-700">
                      Sr Fruits Inventory
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col justify-center gap-4 py-4">
                    <Link href='/hamza' className="cursor-pointer font-semibold text-zinc-600 border rounded-lg p-4 shadow-sm hover:bg-slate-100 transition-all duration-500">
                        Add a fruit
                    </Link>
                    <Link href='/' className="cursor-pointer font-semibold text-zinc-600 border rounded-lg p-4 shadow-sm hover:bg-slate-100 transition-all duration-500">
                        Delete a fruit
                    </Link>
                    <Link href='/' className="cursor-pointer font-semibold text-zinc-600 border rounded-lg p-4 shadow-sm hover:bg-slate-100 transition-all duration-500">
                       Settings
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
