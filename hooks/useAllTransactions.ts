import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { CloudLightning } from "lucide-react";

const useAllInventoryTransactions = (): InventoryData[] | null => {
  const { db } = FirebaseConfig();

  // Define Transaction and InventoryData types
  type Transaction = {
    id: string;
    date: string;
    shell: string;
    unitPrice: string;
    wage: string;
    labours: string;
    expenses: string;
    carExpenses: string;
    priceShunt: string;
    shants: string;
    description: string;
  };

  type InventoryData = {
    Name: string;
    image: string;
    transactions: Transaction[];
  };

  const [inventoryData, setInventoryData] = useState<InventoryData[] | null>(null);

  useEffect(() => {
    const inventoryRef = ref(db, "inventory");

    onValue(inventoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedInventory: InventoryData[] = Object.entries(data).map(([key, value]) => {
          const inventoryItem = value as any;

          // Parse transactions and ensure all required properties are present
          const transactions = inventoryItem.transactions
            ? Object.entries(inventoryItem.transactions).map(([id, transactionData]) => {
                const transaction = transactionData as Partial<Transaction>; // Cast to partial to handle missing properties
                return {
                  id, // Use the key as the ID for each transaction
                  date: transaction.date || "", // Provide defaults for missing properties
                  shell: transaction.shell || "",
                  unitPrice: transaction.unitPrice || "",
                  wage: transaction.wage || "",
                  labours: transaction.labours || "",
                  expenses: transaction.expenses || "",
                  carExpenses: transaction.carExpenses || "",
                  priceShunt: transaction.priceShunt || "",
                  shants: transaction.shants || "",
                  description: transaction.description || "",
                };
              })
            : [];

            // console.log('first',inventoryItem)

          // Return the correct structure with "Name" (uppercase)
          return {
            Name: inventoryItem.Name, // Use "Name" to match InventoryData type
            image: inventoryItem.image,
            transactions,
          };
        });

        setInventoryData(parsedInventory);
      } else {
        setInventoryData([]);
      }
    });
  }, [db]);

  return inventoryData;
};

export default useAllInventoryTransactions;
