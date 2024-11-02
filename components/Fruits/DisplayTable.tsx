"use client";
import useName from "@/lib/Store/NameStore";
import React, { useEffect, useState } from "react";
import { ref, onValue, remove, update, get } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";
import Loader from "../Loader";
import SingleCardListing from "./SingleCardListing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar, CalendarIcon, Pencil } from "lucide-react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const DisplayTable = () => {
  const { name } = useName();
  const { db } = FirebaseConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState("");
  const [date, setDate] = useState<string | undefined>("");
  const [quantity, setQuantity] = useState<string | undefined>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [price, setPrice] = useState<string | undefined>("");
  const [priceShunt, setPriceShunt] = useState<string | undefined>("");
  const [Shunt, setShunt] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [expenses, setExpenses] = useState<string | undefined>("");
  const [carExpenses, setCarExpenses] = useState<string | undefined>("");
  const [singleTransaction, setSingleTransaction] =
    useState<Transaction | null>();

  const useFruitTransactions = (): Transaction[] | null => {
    const [transactions, setTransactions] = useState<Transaction[] | null>(
      null
    );

    useEffect(() => {
      if (!name) return;

      const transactionsRef = ref(db, `inventory/${name}/transactions`);

      onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const transactionsArray = Object.entries(data).map(([key, value]) => {
            const { id: _id, ...transactionData } = value as Transaction; // Destructure id out of value if it exists
            return {
              id: key, // Use key as id
              ...transactionData, // Spread the remaining properties of value
            };
          });
          setTransactions(transactionsArray);
        } else {
          setTransactions([]);
        }
      });
    }, [db, name]);

    return transactions;
  };

  useEffect(() => {
    const getTransaction = async () => {
      if (!isEditing) return; // Only fetch data when editing mode is active
      try {
        const snapshot = await get(
          ref(db, `inventory/${name}/transactions/${selectedTransactionId}`)
        );
        if (!snapshot.exists()) {
          alert("Item does not exist.");
          return;
        }
        setSingleTransaction(snapshot.val());
      } catch (error) {
        console.error("Error fetching transaction: ", error);
        alert("Failed to fetch transaction.");
      }
    };

    getTransaction();
  }, [isEditing, selectedTransactionId, db, name]); // Ensure dependencies are complete

  // Call `useFruitTransactions` without conditionally rendering
  const shipments = useFruitTransactions();

  const handleDeleteTransaction = async (id: string) => {
    try {
      await remove(ref(db, `inventory/${name}/transactions/${id}`));
      alert("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction: ", error);
      alert("Failed to delete transaction.");
    }
  };
  const handleEditTransaction = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  
    const formattedDate = date ? format(new Date(date), "MMMM dd, yyyy") : singleTransaction?.date;
  
    try {
      await update(
        ref(db, `inventory/${name}/transactions/${selectedTransactionId}`),
        {
          date: formattedDate,
          shell: quantity || singleTransaction?.shell,
          unitPrice: price || singleTransaction?.unitPrice,
          shants: Shunt || singleTransaction?.shants,
          description: description || singleTransaction?.description,
          expenses: expenses || singleTransaction?.expenses,
          carExpenses: carExpenses || singleTransaction?.carExpenses,
          priceShunt: priceShunt || singleTransaction?.priceShunt,
        }
      );
      alert("Transaction updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating transaction: ", error);
      alert("Failed to update transaction.");
    }
  };
  
  console.log(shipments);

  // Render different content based on `shipments` state
  if (!shipments)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader />
      </div>
    );
  if (shipments.length === 0)
    return (
      <div className="flex items-center justify-center text-center h-screen w-full text-2xl text-slate-600 uppercase font-bold">
        No shipments of {name} found kindly add one
      </div>
    );

  return (
    <>
      <div className="flex flex-col items-center gap-y-8">
        {shipments.map((shipment) => (
          <SingleCardListing
            id={shipment.id}
            key={shipment.id}
            shell={shipment.shell}
            date={shipment.date}
            price={shipment.unitPrice}
            expenses={shipment.expenses}
            carExpenses={shipment.carExpenses}
            description={shipment.description}
            priceShunt={shipment.priceShunt}
            shants={shipment.shants}
            onDelete={() => handleDeleteTransaction(shipment.id)}
            setIsEditing={setIsEditing}
            setTransactionId={setSelectedTransactionId}
          />
        ))}
      </div>
      <div>
        {isEditing ? (
          <div>
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
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
                    <Input
                      defaultValue={singleTransaction?.date}
                      className="col-span-3"
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Shells
                    </Label>
                    <Input
                      id="quantity"
                      placeholder="Enter number of shells..."
                      className="col-span-3"
                      defaultValue={singleTransaction?.shell}
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
                      defaultValue={singleTransaction?.unitPrice}
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
                      defaultValue={singleTransaction?.shants}
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
                      defaultValue={singleTransaction?.priceShunt}
                      onChange={(e) => setPriceShunt(e.target.value)}
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
                      defaultValue={singleTransaction?.carExpenses}
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
                      defaultValue={singleTransaction?.expenses}
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
                      defaultValue={singleTransaction?.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={(e) => handleEditTransaction(e)}>
                    Edit Items
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DisplayTable;
