"use client";
import useName from "@/lib/Store/NameStore";
import React, { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";
import Loader from "../Loader";
import SingleCardListing from "./SingleCardListing";



const DisplayTable = () => {
  const { name } = useName();
  const { db } = FirebaseConfig();

  const useFruitTransactions = (): Transaction[] | null => {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  
    useEffect(() => {
      if (!name) return;
  
      const transactionsRef = ref(db, `inventory/${name}/transactions`);
  
      onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const transactionsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...(value as Transaction),
          }));
          setTransactions(transactionsArray);
        } else {
          setTransactions([]);
        }
      });
    }, [db, name]);
  
    return transactions;
  };
  
  // Call `useFruitTransactions` without conditionally rendering
  const shipments = useFruitTransactions();
  console.log(shipments);
  console.log(name);

  const handleDeleteTransaction = async (id: string) => {
    try {
      await remove(ref(db, `inventory/${name}/transactions/${id}`));
      alert("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction: ", error);
      alert("Failed to delete transaction.");
    }
  };
  const handleEditTransaction = async (id: string, updatedData: Partial<Transaction>) => {
    try {
      await update(ref(db, `inventory/${name}/transactions/${id}`), updatedData);
      alert("Transaction updated successfully!");
    } catch (error) {
      console.error("Error updating transaction: ", error);
      alert("Failed to update transaction.");
    }
  };
  console.log(shipments)

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
    <div className="flex flex-col items-center gap-y-8">
      {shipments.map((shipment) => (
        <SingleCardListing
          id={shipment.id}
          key={shipment.id}
          shell={shipment.shell}
          date={shipment.date}
          price={shipment.unitPrice}
          expenses={shipment.expenses}
          wage={shipment.wage}
          labours={shipment.labours}
          carExpenses={shipment.carExpenses}
          onDelete={() => handleDeleteTransaction(shipment.id)}
          onEdit={() => console.log("shipme")}
        />
      ))}
    </div>
  );
};

export default DisplayTable;
