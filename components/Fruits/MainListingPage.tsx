"use client";
import useName from "@/lib/Store/NameStore";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "../ImageUpload";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { set, ref, push } from "firebase/database";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import DisplayTable from "./DisplayTable";

const MainListingPage = () => {
  const { db } = FirebaseConfig();
  const [date, setDate] = React.useState<Date>();
  const [quantity, setQuantity] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [priceShunt, setPriceShunt] = useState("");
  const [Shunt, setShunt] = useState("");
  const [description, setDescription] = useState("");
  const [wage, setWage] = useState("");
  const [labours, setLabours] = useState("");
  const [expenses, setExpenses] = useState("");
  const [carExpenses, setCarExpenses] = useState("");

  const { name } = useName();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!quantity || !price || !date || !wage || !expenses || !labours) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const transactionsRef = ref(db, `inventory/${name}/transactions`);
      await push(transactionsRef, {
        date: format(date, "MMMM dd, yyyy"),
        shell: quantity,
        unitPrice: price,
        wage: wage,
        labours: labours,
        expenses: expenses,
        carExpenses: carExpenses,
        priceShunt: priceShunt,
        shants: Shunt,
        description:description,
      });
      alert("Item saved successfully!"); // Optionally show a success message
      setIsDialogOpen(false); // Close the dialog upon success
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data. Please try again.");
    }
  };
  return (
    <div className="flex flex-col gap-y-8 items-center justify-center">
      <div className="flex items-center justify-center w-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="my-7">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:from-slate-600 hover:via-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-opacity-70 active:bg-slate-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4">
            <Plus className="mr-2" />
            Add {name} details
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add {name}&apos;s details</DialogTitle>
          <DialogDescription>
            Add item&apos;s name and image.
          </DialogDescription>
        </DialogHeader>
        
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full col-span-3 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick shipment date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Shells
              </Label>
              <Input
                id="quantity"
                placeholder="Enter number of shells..."
                className="col-span-3"
                
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unitPrice" className="text-right">
                Price
              </Label>
              <Input
                id="unitPrice"
                placeholder="Enter price per shell..."
                className="col-span-3"
                
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shant-quantity" className="text-right">
                Shant
              </Label>
              <Input
                id="shant-quantity"
                placeholder="Enter number of shells(shaant)..."
                className="col-span-3"
                
                onChange={(e) => setShunt(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shant-price" className="text-right">
                Price
              </Label>
              <Input
                id="shant-price"
                placeholder="Enter price of shells(shant)..."
                className="col-span-3"
                
                onChange={(e) => setPriceShunt(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="labours" className="text-right">
                Labours
              </Label>
              <Input
                id="labours"
                placeholder="Enter number of labours..."
                className="col-span-3"
                
                onChange={(e) => setLabours(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wages" className="text-right">
                Wages
              </Label>
              <Input
                id="wages"
                placeholder="Enter Wages of all labours..."
                className="col-span-3"
                
                onChange={(e) => setWage(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="car-expenses" className="text-right">
                Car Expenses
              </Label>
              <Input
                id="car-expenses"
                placeholder="Enter car expenses..."
                className="col-span-3"
                
                onChange={(e) => setCarExpenses(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Expenses" className="text-right">
                Expenses
              </Label>
              <Input
                id="Expenses"
                placeholder="Other expenses like car rent..."
                className="col-span-3"
                
                onChange={(e) => setExpenses(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Type your description"
                className="col-span-3"
                
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
          <Button onClick={(e) => handleSubmit(e)}>Add Items</Button>
          </DialogFooter>
        
      </DialogContent>
    </Dialog>
      </div>

      <div className="text-4xl text-slate-600 font-black underline">
        {name}s
      </div>
      <Separator />
      <div>
        <DisplayTable />
      </div>
    </div>
  );
};

export default MainListingPage;
