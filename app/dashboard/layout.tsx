'use client'
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
import { signOutUser } from "@/firebase/authHelpers";

import { AlignJustify, Calculator, House, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  const handleLogOut = async ()=>{
    await signOutUser();
    router.push('/');
  }
  return (
      <>
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between h-16 bg-slate-200 px-4">
            <div className="flex items-center gap-x-2">
              <Avatar>
                <AvatarImage src="/assets/guava.png" />
                <AvatarFallback>S.R</AvatarFallback>
              </Avatar>
              <div className="Capitalize text-xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                {" "}
                S.R Farm Manager
              </div>
            </div>
            <div className="border-2 border-black rounded-sm cursor-pointer">
              <Sheet >
                <SheetTrigger asChild>
                  <div>
                    <AlignJustify />
                  </div>
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader className="flex flex-row gap-x-2 items-center">
                    <Avatar>
                      <AvatarImage src="/assets/guava.png" />
                      <AvatarFallback>S.R</AvatarFallback>
                    </Avatar>
                    <SheetTitle className="Capitalize text-lg font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                      S.R Farm Manager
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col justify-center gap-4 py-4">
                    <Link href='/dashboard' className="cursor-pointer flex gap-x-4 font-semibold text-zinc-600 border rounded-lg p-4 shadow-sm hover:bg-slate-100 transition-all duration-500">
                    <House /> Home
                    </Link>
                    <Link href='/dashboard/employees' className="flex gap-x-4 cursor-pointer font-semibold text-zinc-600 border rounded-lg p-4 shadow-sm hover:bg-slate-100 transition-all duration-500">
                    <Users /> Employees
                    </Link>
                    <Link href='/dashboard/totals' className="flex gap-x-4 cursor-pointer font-semibold text-zinc-600 border rounded-lg p-4 shadow-sm hover:bg-slate-100 transition-all duration-500">
                    <Calculator />  Totals
                    </Link>
                    <div  className="flex gap-x-4 cursor-pointer font-semibold text-zinc-600 border rounded-lg p-4 shadow-sm hover:bg-slate-100 transition-all duration-500" onClick={handleLogOut}>
                    <LogOut />   Logout
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {children}
      </>
  );
}
