"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "./ImageUpload";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { set, ref } from "firebase/database";

const SearchButton = () => {
  const db = FirebaseConfig();
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!logo || !name || !quantity) {
      alert("Please fill out all fields.");
      return;
    }

    await set(ref(db, `inventory/${name}`), {
      image: logo,
      Quantity: quantity,
      Name: name,
      transactions: {},
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="my-7">
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:from-slate-600 hover:via-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-opacity-70 active:bg-slate-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4">
              <Plus />
              Add an item
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add an item</DialogTitle>
            <DialogDescription>
              Add item&apos;s name and image.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter item name..."
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                placeholder="Enter Quantity (kgs)..."
                className="col-span-3"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <div className="col-span-3">
                <ImageUpload
                  value={logo}
                  onChange={(image) => setLogo(image)}
                  label="Upload logo"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={(e) => handleSubmit(e)}>Add Items</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchButton;
