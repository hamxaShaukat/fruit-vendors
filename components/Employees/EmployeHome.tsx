"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { format } from "date-fns";
import { push, ref } from "firebase/database";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface EmployeeField {
  id: number;
  name: string;
  wage: string;
}

export default function EmployeeHome() {
  const { db } = FirebaseConfig();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<string | undefined>("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState<EmployeeField[]>([
    { id: 1, name: "", wage: "" },
  ]);

  const handleAddEmployee = () => {
    const newId =
      employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    setEmployees([...employees, { id: newId, name: "", wage: "" }]);
  };

  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEmployeeChange = (
    id: number,
    field: "name" | "wage",
    value: string
  ) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = date ? format(new Date(date), "MMMM dd, yyyy") : null;

    const newRecordRef = ref(db, `labors/`); // Adjust path as needed

    // Data to be saved in Firebase
    const recordData = {
      date: formattedDate,
      description:description,
      Employes:employees,
    };

    try {
      // Push the recordData to Firebase
      await push(newRecordRef, recordData);
      alert("Record saved successfully!");
      setIsDialogOpen(false);
      setEmployees([
        { id: 1, name: "", wage: "" },
      ])
    } catch (error) {
      console.error("Error saving record: ", error);
      alert("Failed to save record.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="my-7">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:from-slate-600 hover:via-slate-700 hover:to-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-opacity-70 active:bg-slate-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4">
            <Plus className="mr-2" />
            Add employes details
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Labours details</DialogTitle>
          <DialogDescription>Add employee details and wages.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input id="date" type="date" className="col-span-3" onChange={(e) =>setDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Enter description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {employees.map((employee, index) => (
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
                      handleEmployeeChange(employee.id, "wage", e.target.value)
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
            <Button className="w-full" type="submit">Save Details</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
