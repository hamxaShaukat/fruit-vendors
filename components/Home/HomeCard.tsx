/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ArrowRight, Pen, Trash } from "lucide-react";
import useName from "@/lib/Store/NameStore";
import { useRouter } from "next/navigation";
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
import { get, ref, remove, update } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ImageUpload from "../ImageUpload";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
interface ImageCardProps {
  imageUrl: string;
  title: string;
}

const HomeCard = ({ imageUrl, title }: ImageCardProps) => {
  const router = useRouter();
  const { db } = FirebaseConfig();
  const [isOpen, setIsOpen] = useState(false);
  const { name, setName } = useName();
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const [nameTitle, setNameTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleYesAction = async () => {
    try {
      // Remove the item based on its name as the key
      await remove(ref(db, `inventory/${title}`));
      toast({
        variant: "destructive",
        title: "Delete successful.",
        description: `${title} deleted succuesfully`,
      });
    } catch (error) {
      console.error("Error deleting item: ", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const goToSpecificFruit = (specificTitle: string) => {
    setName(specificTitle);
    router.push(`/dashboard/fruits/${specificTitle}`);
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  
    // Set default values if no new data is provided
    const updatedImage = logo || imageUrl;
    const updatedName = nameTitle || title;
  
    try {
      // Get the current data for the item
      const itemRef = ref(db, `inventory/${title}`);
      const snapshot = await get(itemRef);
      if (!snapshot.exists()) {
        alert("Item does not exist.");
        return;
      }
  
      const currentItem = snapshot.val();
  
      // Merge current data with updated fields
      const newItem = {
        ...currentItem, // Keep existing data like transactions
        Name: updatedName,
        image: updatedImage,
      };
  
      // Update the item under the new name key and delete the old key if the name has changed
      if (updatedName !== title) {
        await remove(itemRef); // Remove old item
      }
      await update(ref(db, `inventory/${updatedName}`), newItem);
  
      toast({
        variant: "signal",
        title: "Update successful.",
        description: `${updatedName} updated successfully`,
      });
  
      setIsDialogOpen(false); // Close dialog after update
    } catch (error) {
      console.error("Error updating data: ", error);
      alert("Failed to update data. Please try again.");
    }
  };
 

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={imageUrl} alt={title} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="flex items-center gap-x-3">
          <div
            className="inline-flex items-center px-3 py-2 gap-x-1 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 cursor-pointer"
            onClick={() => goToSpecificFruit(title)}
          >
            View
            <ArrowRight className="h-4 w-4" />
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div className="inline-flex items-center px-3 py-2 gap-x-1 text-sm font-medium text-center text-white bg-red-900 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer">
                Delete
                <Trash className="h-4 w-4" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Alert!!!</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {title}?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  No
                </Button>
                <Button variant="destructive" onClick={handleYesAction}>
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="inline-flex items-center px-3 py-2 gap-x-1 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                Edit
                <Pen className="h-4 w-4" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit {title}</DialogTitle>
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
                    defaultValue={title}
                    onChange={(e) => setNameTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <div className="col-span-3">
                    <ImageUpload
                      value={imageUrl}
                      onChange={(image) => setLogo(image)}
                      label="Upload logo"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={(e) => handleUpdate(e)}>Edit Items</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
