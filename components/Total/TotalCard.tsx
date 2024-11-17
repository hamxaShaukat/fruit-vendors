import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Citrus } from "lucide-react";

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
type Employee = {
  id: string;
  name: string;
  wage: string;
};

type Labor = {
  id: string;
  employees: Employee[];
};

interface TotalCardProps {
  name: string;
  transactions: Transaction[];
  labors: Labor[] | null;
}

const TotalCard = ({ name, transactions, labors }: TotalCardProps) => {
  const totalQuantity = transactions.reduce((total, transaction) => {
    const shell = parseFloat(transaction.shell) || 0; // Convert to number or default to 0
    const shants = parseFloat(transaction.shants) || 0; // Convert to number or default to 0
    return total + shell + shants;
  }, 0);
  const totalExpenses = transactions.reduce((total, transaction) => {
    const carExpense = parseFloat(transaction.carExpenses) || 0;
    const expenses = parseFloat(transaction.expenses)||0;
    return total + carExpense + expenses;
  }, 0);
  const totalPrice = transactions.reduce((total, transaction) => {
    const singleShant = parseInt(transaction.priceShunt) || 0;
    const shantQuantity = parseInt(transaction.shants) || 0;
    const shantPrice = singleShant * shantQuantity;

    const unitPrice = parseInt(transaction.unitPrice) || 0;
    const quantity = parseInt(transaction.shell) || 0;
    const totalPrice = unitPrice * quantity;
    return total + totalPrice + shantPrice;
  }, 0);

  const totalEmployeeWages = labors?.reduce((total, labor) => {
    const laborWages = labor.employees.reduce(
      (sum, employee) => sum + parseFloat(employee.wage || "0"),
      0
    );
    return total + laborWages;
  }, 0) ?? 0;

  const DataRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | undefined;
  }) => (
    <div className="flex justify-between items-center py-2 text-slate-800 bg-slate-100">
      <span className="text-sm">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
  return (
    <div className="my-6">
      <Card className="w-full max-w-md mx-auto shadow-lg bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <CardHeader className="pb-2 flex flex-col justify-between items-start gap-y-2">
          <div>
            <CardTitle className="text-xs font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <Citrus className="h-5 w-5" />
              <span> {name}&apos;s Details</span>
            </CardTitle>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
              Full record till now
            </p>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <Tabs defaultValue="Labours" className="w-full">
            <TabsList className="w-full mb-4 bg-slate-200 dark:bg-slate-700">
              <TabsTrigger
                value="Labours"
                className="w-1/2 data-[state=active]:bg-slate-300 dark:data-[state=active]:bg-slate-600"
              >
                Total+Labors
              </TabsTrigger>
              <TabsTrigger
                value="desc"
                className="w-1/2 data-[state=active]:bg-slate-300 dark:data-[state=active]:bg-slate-600"
              >
                Total only
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Labours">
              <DataRow label="Total Quantity" value={totalQuantity} />
              <DataRow label="Total Price" value={totalPrice} />
              <DataRow label="Total wages" value={totalEmployeeWages} />
              <DataRow label="Total expenses" value={totalExpenses} />
            </TabsContent>
            <TabsContent value="desc">{10000}</TabsContent>
          </Tabs>
        </CardContent>
        <Separator className="bg-slate-300 dark:bg-slate-700" />
        <CardFooter className="flex justify-between items-center pt-4">
          <div className="text-lg font-bold flex items-center text-slate-800 dark:text-slate-200">
            Total ravanue :
            <Badge variant="default" className="ml-2">
              Rs {totalPrice - (totalEmployeeWages + totalExpenses)}

            </Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TotalCard;
