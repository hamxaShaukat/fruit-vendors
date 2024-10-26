"use client";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";

type InventoryItem = {
  image: string;
  quantity: string;
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
  