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
import { ref,remove } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
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
 

  const handleYesAction = async () => {
    try {
      // Remove the item based on its name as the key
      await remove(ref(db, `inventory/${title}`));
      toast({
        variant: "destructive",
        title: "Delete successful.",
        description: `${title} deleted succuesfully`,
      })
    } catch (error) {
      console.error("Error deleting item: ", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const goToSpecificFruit = (specificTitle: string) => {
    setName(specificTitle);
    router.push(`/dashboard/fruits/${specificTitle}`);
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
            <div
            className="inline-flex items-center px-3 py-2 gap-x-1 text-sm font-medium text-center text-white bg-red-900 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer"
            
          >
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
                <Button variant="destructive" onClick={handleYesAction}>Yes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
         
          <div
            className="inline-flex items-center px-3 py-2 gap-x-1 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            onClick={() => goToSpecificFruit(title)}
          >
            Edit
            <Pen className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
