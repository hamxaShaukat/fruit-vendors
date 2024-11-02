"use client";

import React, { useMemo, useState } from "react";
import { Pencil, Trash2, Calendar, CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";

interface SingleCardListingProps {
  id: string;
  date: string;
  shell: string;
  price: string;
  expenses: string;
  carExpenses: string;
  priceShunt: string;
  shants: string;
  description: string;
  onDelete: (id: string) => void;
  setIsEditing: (state: boolean) => void;
  setTransactionId: (id: string) => void;
}

export default function SingleCardListing({
  id,
  date,
  shell,
  price,
  expenses,
  carExpenses,
  priceShunt,
  shants,
  description,
  onDelete,
  setIsEditing,
  setTransactionId,
}: SingleCardListingProps) {
  const totalShells = parseInt(shell);
  const totalPrice = parseInt(price);
  
  const totalExpenses = parseInt(expenses);
  const totalCarExpenses = parseInt(carExpenses);
  const totalShants = parseInt(shants);
  const totalPriceShunt = parseInt(priceShunt);

  const [isOpen, setIsOpen] = useState(false);

  const totalProfit = useMemo(() => {
    return (
      totalShells * totalPrice +
      totalShants * totalPriceShunt -
      totalExpenses -
      totalCarExpenses
    );
  }, [
    totalShells,
    totalPrice,
    totalExpenses,
    totalCarExpenses,
    totalShants,
    totalPriceShunt,
  ]);

  const isProfit = totalProfit > 0;
  const handleEditClick = () => {
    // alert("Edit transaction");
    setIsEditing(true);
    setTransactionId(id);
  };
  const DataRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div
      className={cn(
        "flex justify-between items-center py-2",
        isProfit
          ? "text-green-800 dark:text-green-200"
          : "text-red-800 dark:text-red-200"
      )}
    >
      <span className="text-sm">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <Card
      className={cn(
        "w-full max-w-md mx-auto shadow-lg",
        isProfit
          ? "bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700"
          : "bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-700"
      )}
    >
      <CardHeader className="pb-2 flex flex-col justify-between items-start gap-y-2">
        <div className="flex w-full gap-2">
          <Button
            className="w-1/2"
            variant="outline"
            size="icon"
            aria-label="Delete"
            onClick={handleEditClick}
          >
            <Pencil
              className={cn(
                "h-4 w-4",
                isProfit
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              )}
            />
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-1/2"
                variant="outline"
                size="icon"
                aria-label="Delete"
              >
                <Trash2
                  className={cn(
                    "h-4 w-4",
                    isProfit
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Alert!!!</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  No
                </Button>
                <Button variant="destructive" onClick={() => onDelete(id)}>
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <CardTitle
            className={cn(
              "text-xs font-bold flex items-center gap-2",
              isProfit
                ? "text-green-900 dark:text-green-100"
                : "text-red-900 dark:text-red-100"
            )}
          >
            <Calendar className="h-5 w-5" />
            <span>{date}</span>
          </CardTitle>
          <p
            className={cn(
              "text-sm mt-1",
              isProfit
                ? "text-green-600 dark:text-green-300"
                : "text-red-600 dark:text-red-300"
            )}
          >
            Profit Tracking
          </p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="shells" className="w-full">
          <TabsList
            className={cn(
              "w-full mb-4",
              isProfit
                ? "bg-green-100 dark:bg-green-800"
                : "bg-red-100 dark:bg-red-800"
            )}
          >
            <TabsTrigger
              value="shells"
              className={cn(
                "w-1/2",
                isProfit
                  ? "data-[state=active]:bg-green-200 dark:data-[state=active]:bg-green-700"
                  : "data-[state=active]:bg-red-200 dark:data-[state=active]:bg-red-700"
              )}
            >
              Shells
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className={cn(
                "w-1/2",
                isProfit
                  ? "data-[state=active]:bg-green-200 dark:data-[state=active]:bg-green-700"
                  : "data-[state=active]:bg-red-200 dark:data-[state=active]:bg-red-700"
              )}
            >
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="description"
              className={cn(
                "w-1/2",
                isProfit
                  ? "data-[state=active]:bg-green-200 dark:data-[state=active]:bg-green-700"
                  : "data-[state=active]:bg-red-200 dark:data-[state=active]:bg-red-700"
              )}
            >
              Description
            </TabsTrigger>
          </TabsList>
          <TabsContent value="shells">
            <DataRow label="Number of shells" value={totalShells} />
            <DataRow label="Price per shell" value={`Rs ${totalPrice}`} />
            <DataRow
              label="Total Revenue"
              value={`Rs ${totalShells * totalPrice}`}
            />
            <DataRow label="Number of shells(shant)" value={totalShants} />
            <DataRow
              label="Price per shell(shant)"
              value={`Rs ${totalPriceShunt}`}
            />
            <DataRow
              label="Total Revenue(shant)"
              value={`Rs ${totalShants * totalPriceShunt}`}
            />
          </TabsContent>
          <TabsContent value="expenses">
            <DataRow label="Car Expense" value={`Rs ${totalCarExpenses}`} />
            <DataRow label="Other Expenses" value={`Rs ${totalExpenses}`} />
            <DataRow
              label="Total Expenses"
              value={`Rs ${totalExpenses  + totalCarExpenses}`}
            />
          </TabsContent>
          <TabsContent value="description">{description}</TabsContent>
        </Tabs>
      </CardContent>
      <Separator
        className={cn(
          isProfit
            ? "bg-green-200 dark:bg-green-700"
            : "bg-red-200 dark:bg-red-700"
        )}
      />
      <CardFooter className="flex justify-between items-center pt-4">
        <div
          className={cn(
            "text-lg font-bold flex items-center",
            isProfit
              ? "text-green-900 dark:text-green-100"
              : "text-red-900 dark:text-red-100"
          )}
        >
          Total Profit:
          <Badge
            variant={isProfit ? "success" : "destructive"}
            className="ml-2"
          >
            Rs {totalProfit}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
