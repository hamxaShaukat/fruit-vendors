import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import FirebaseConfig from "@/firebase/firbaseConfig";

interface EmployeeField {
  id: number;
  name: string;
  wage: string;
}

interface LaborRecord {
  id: string;
  date: string;
  description: string;
  employees: EmployeeField[];
}

const useLaborById = (laborId: string | null) => {
  const { db } = FirebaseConfig();
  const [labor, setLabor] = useState<LaborRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const laborRef = ref(db, `labors/${laborId}`);

    const unsubscribe = onValue(
      laborRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("data from Firebase:", data); // Log snapshot data
        if (data) {
          setLabor({ ...data });
        } else {
          setLabor(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching labor data:", error);
        setError("Failed to fetch labor data.");
        setLoading(false);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, [db, laborId]);

  // Debugging state changes
  useEffect(() => {
    console.log("Updated labor state:", labor);
  }, [labor]);

  return { labor, loading, error };
};

export default useLaborById;
