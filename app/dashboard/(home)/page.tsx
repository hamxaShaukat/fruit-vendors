"use client";
import HomeCard from "@/components/Home/HomeCard";
import MainHome from "@/components/Home/MainHome";
import React from "react";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import Loader from "@/components/Loader";
import useSearch from "@/lib/Store/SearchStore";

type InventoryItem = {
  image: string;
  unitPrice?: number;
};

type Inventory = Record<string, InventoryItem>;

const useInventory = (): Inventory | null => {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const { db } = FirebaseConfig();

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
  const { search } = useSearch();

  // Filter inventory based on the search term
  const filteredInventory = search
    ? Object.entries(inventory || {}).filter(([itemName]) =>
        itemName.toLowerCase().includes(search.toLowerCase())
      )
    : Object.entries(inventory || {});

  if (!inventory) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div>
        <MainHome />
      </div>
      <div className="flex flex-col items-center gap-12 my-12">
        {filteredInventory.map(([itemName, itemDetails]) => (
          <HomeCard
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
