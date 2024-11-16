"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDate from "@/lib/Store/DateStore";
import useLaborStore from "@/lib/Store/LaborStore";
import { Calendar, Pencil, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { format } from "date-fns";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { ref, set } from "firebase/database";
interface EmployeeField {
  id: number;
  name: string;
  wage: string;
}
interface LaborCardsProps {
  employees: EmployeeField[];
  desc: string;
  // setIsEditing: (state: boolean) => void;
}
const LaborCards = ({ employees, desc }: LaborCardsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { laborDate } = useDate();
  const [Emps, setEmps] = useState<EmployeeField[]>(employees);
  const [date, setDate] = useState<string | undefined>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [description, setDescription] = useState("");
  const handleAddEmployee = () => {
    const newId =
      employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    setEmps([...employees, { id: newId, name: "", wage: "" }]);
  };
  const { laborId } = useLaborStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
  
    // Assuming laborId is globally accessible from useLaborStore
  
    // Validate input
      const formattedDate = date ? format(new Date(date), "MMMM dd, yyyy") : null;

  
    // Prepare the updated data
    const updatedLaborData = {
      date: formattedDate || laborDate  , // Use existing date if not updated
      description: description || desc, // Use existing description if not updated
      employees: Emps
    };
    const { db } = FirebaseConfig();
  
  
    // Add your update logic here
    // Assuming Firebase is used:
    const laborRef = ref(db, `labors/${laborId}`);
  
    // Update data in Firebase
    set(laborRef, updatedLaborData)
      .then(() => {
        alert("Labor data updated successfully!");
        setIsDialogOpen(false); // Close the dialog on success
      })
      .catch((error:string) => {
        console.error("Error updating labor data:", error);
        alert("Failed to update labor data. Please try again.");
      });
  };
  

  const handleRemoveEmployee = (id: number) => {
    setEmps(employees.filter((employee) => employee.id !== id));
  };

  const handleEmployeeChange = (
    id: number,
    field: "name" | "wage",
    value: string
  ) => {
    setEmps(
      Emps.map((employee) =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    );
  };
  const totalWages = useMemo(() => {
    return employees.reduce((total, emp) => total + parseFloat(emp.wage), 0);
  }, [employees]);
  const DataRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex justify-between items-center py-2 text-slate-800 bg-slate-100">
      <span className="text-sm">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <CardHeader className="pb-2 flex flex-col justify-between items-start gap-y-2">
        <div className="flex items-end justify-end w-full gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-1/4"
                variant="outline"
                size="icon"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4 text-slate-800 dark:text-slate-400" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Labours details</DialogTitle>
                <DialogDescription>
                  Add employee details and wages.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="grid gap-4 py-4">
                 
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      placeholder="Enter description"
                      className="col-span-3"
                      defaultValue={desc}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  {Emps.map((employee, index) => (
                    <div key={employee.id} className="grid gap-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor={`employee-name-${employee.id}`}
                          className="text-right"
                        >
                          Name
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                          <Input
                            id={`employee-name-${employee.id}`}
                            placeholder="Enter employee name"
                            value={employee.name}
                            onChange={(e) =>
                              handleEmployeeChange(
                                employee.id,
                                "name",
                                e.target.value
                              )
                            }
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveEmployee(employee.id)}
                              aria-label={`Remove employee ${
                                employee.name || index + 1
                              }`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor={`employee-wage-${employee.id}`}
                          className="text-right"
                        >
                          Wage
                        </Label>
                        <Input
                          id={`employee-wage-${employee.id}`}
                          placeholder="Enter employee wage"
                          className="col-span-3"
                          value={employee.wage}
                          onChange={(e) =>
                            handleEmployeeChange(
                              employee.id,
                              "wage",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddEmployee}
                    className="mt-2"
                  >
                    Add Employee
                  </Button>
                </div>
                <DialogFooter>
                  <Button className="w-full" type="submit">
                    Save Details
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        
        </div>
        <div>
          <CardTitle className="text-xs font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <Calendar className="h-5 w-5" />
            <span>{laborDate}</span>
          </CardTitle>
          <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
            Labour Tracking
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
              Shells
            </TabsTrigger>
            <TabsTrigger
              value="desc"
              className="w-1/2 data-[state=active]:bg-slate-300 dark:data-[state=active]:bg-slate-600"
            >
              Description
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Labours">
            {employees.map((emp) => (
              <div key={emp.id}>
                <DataRow label="Employee Name" value={emp.name} />
                <DataRow label="Wage" value={`Rs ${emp.wage}`} />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="desc">{desc}</TabsContent>
        </Tabs>
      </CardContent>
      <Separator className="bg-slate-300 dark:bg-slate-700" />
      <CardFooter className="flex justify-between items-center pt-4">
        <div className="text-lg font-bold flex items-center text-slate-800 dark:text-slate-200">
          Total Wages:
          <Badge variant="default" className="ml-2">
            Rs {totalWages}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LaborCards;
