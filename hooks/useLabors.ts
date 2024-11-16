import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";

interface EmployeeField {
  id: number;
  name: string;
  wage: string;
}

interface LaborRecord {
  id:string;
  date: string;
  description: string;
  employees: EmployeeField[];
}

const useLabors = () => {
  const { db } = FirebaseConfig();
  const [labors, setLabors] = useState<LaborRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const laborsRef = ref(db, "labors");

    const unsubscribe = onValue(
      laborsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert Firebase data to an array
          const laborsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setLabors(laborsArray);
        } else {
          setLabors([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching labors:", error);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, [db]);

  return { labors, loading, error };
};

export default useLabors;
