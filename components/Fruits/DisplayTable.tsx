"use client";
import useName from "@/lib/Store/NameStore";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";
import Loader from "../Loader";
import SingleCardListing from "./SingleCardListing";

type Transaction = {
  date: string;
  shell: string;
  unitPrice: string;
  wage: string;
  labours: string;
  expenses: string;
};

const DisplayTable = () => {
  const { name } = useName();

  // Move the conditional logic inside `useFruitTransactions`
  const useFruitTransactions = (): Transaction[] | null => {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const {db} = FirebaseConfig();

    useEffect(() => {
      if (!name) return; // Wait for `name` to load before proceeding

      // Set up a reference to the specific fruit's transactions
      const transactionsRef = ref(db, `inventory/${name}/transactions`);

      // Fetch transactions data
      onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Map transactions data to an array
          const transactionsArray = Object.values(data) as Transaction[];
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

  // Render different content based on `shipments` state
  if (!shipments)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader />
      </div>
    );
  if (shipments.length === 0)
    return (
      <div className="flex items-center justify-center h-screen w-full text-2xl text-slate-600 uppercase font-bold">
        No shipments of {name} found kindly add one
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-y-8">
      {shipments.map((shipment) => (
        <SingleCardListing
          key={shipment.shell}
          shell={shipment.shell}
          date={shipment.date}
          price={shipment.unitPrice}
          expenses={shipment.expenses}
          wage={shipment.wage}
          labours={shipment.labours}
        />
      ))}
    </div>
  );
};

export default DisplayTable;
