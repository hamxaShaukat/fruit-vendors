import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";

type Employee = {
  id: string;
  name: string;
  wage: string;
};

type Labor = {
  id: string;
  employees: Employee[];
};

const useAllLaborData = (): Labor[] | null => {
  const { db } = FirebaseConfig();
  const [laborData, setLaborData] = useState<Labor[] | null>(null);

  useEffect(() => {
    const laborRef = ref(db, "labors");

    onValue(laborRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedLabor: Labor[] = Object.entries(data).map(
          ([key, value]) => {
            const laborItem = value as any; // Assumes each labor node has a consistent structure

            // Parse employees
            const employees = laborItem.Employes
              ? Object.values(laborItem.Employes).map((employee: any) => ({
                  id: employee.id,
                  name: employee.name,
                  wage: employee.wage,
                }))
              : [];
                // console.log('employees',employees)
            // Return the labor structure
            return {
              id: key,
              employees,
            };
          }
        );

        setLaborData(parsedLabor);
      } else {
        setLaborData([]);
      }
    });
  }, [db]);

  return laborData;
};

export default useAllLaborData;
