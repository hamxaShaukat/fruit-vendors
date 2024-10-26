"use client";
import HomeCard from "@/components/Home/HomeCard";
import MainHome from "@/components/Home/MainHome";
import React from "react";


import FirebaseConfig from "@/firebase/firbaseConfig";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";

type InventoryItem = {
  image: string;
  Quantity: string;
  unitPrice?: number;
};

type Inventory = Record<string, InventoryItem>;

const useInventory = (): Inventory | null => {
    const [inventory, setInventory] = useState<Inventory | null>(null);
    const db = FirebaseConfig();
  
    useEffect(() => {
      const inventoryRef = ref(db, "inventory");
      onValue(inventoryRef, (snapshot) => {
        setInventory(snapshot.val());
      });
    }, [db]);
  
    return inventory;
  };
  

const HomePage = () => {
  const inventory = useInventory();
  console.log(inventory)
  if (!inventory) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <MainHome />
      </div>
      <div className="flex flex-col items-center gap-12 my-12">
        {Object.entries(inventory).map(([itemName, itemDetails]) => (
          <HomeCard
            quantity={itemDetails.Quantity}
            key={itemName}
            title={itemName}
            imageUrl={itemDetails.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
