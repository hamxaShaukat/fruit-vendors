"use client";
import HomeCard from "@/components/Home/HomeCard";
import MainHome from "@/components/Home/MainHome";
import React, { useState, useEffect } from "react";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { ref, onValue } from "firebase/database";
import Loader from "@/components/Loader";
import useSearch from "@/lib/Store/SearchStore";

type InventoryItem = {
  image: string;
  unitPrice?: number;
};

type Inventory = Record<string, InventoryItem>;

const useInventory = (): { inventory: Inventory | null; loading: boolean } => {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const { db } = FirebaseConfig();

  useEffect(() => {
    const inventoryRef = ref(db, "inventory");
    const unsubscribe = onValue(inventoryRef, (snapshot) => {
      const data = snapshot.val();
      setInventory(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [db]);

  return { inventory, loading };
};

const HomePage = () => {
  const { inventory, loading } = useInventory();
  const { search } = useSearch();

  // Filter inventory based on the search term
  const filteredInventory = search
    ? Object.entries(inventory || {}).filter(([itemName]) =>
        itemName.toLowerCase().includes(search.toLowerCase())
      )
    : Object.entries(inventory || {});

  if (loading) {
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
