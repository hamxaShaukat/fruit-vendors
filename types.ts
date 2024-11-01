// Define the structure of each inventory item
type InventoryItem = {
    image: string;
    Quantity: string;
    unitPrice?: number; // Optional, if you have this field
  };
  
  type Transaction = {
    id: string;
    date: string;
    shell: string;
    unitPrice: string;
    wage: string;
    labours: string;
    expenses: string;
    carExpenses: string;
  };