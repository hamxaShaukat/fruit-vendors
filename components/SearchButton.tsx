"use client";
import { Plus, Search } from "lucide-react";
import React, { useState ,ChangeEventHandler}  from "react";
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
import useSearch from "@/lib/Store/SearchStore";

const SearchButton = () => {
  const { db } = FirebaseConfig();
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const {setSearch} = useSearch();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>{
      setSearch(e.target.value);
  }
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!logo || !name ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await set(ref(db, `inventory/${name}`), {
        image: logo,
        Name: name,
        transactions: {},
      });
      alert("Item saved successfully!"); // Optionally show a success message
      setIsDialogOpen(false); // Close the dialog upon success
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="relative mt-8">
          <input
            placeholder="Search..."
            className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
            name="search"
            type="search"
            onChange={handleChange}
          />
          <svg
            className="size-6 absolute top-3 right-3 text-gray-500"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
      </div>
    </>
  );
};

export default SearchButton;
